import React, { useEffect, useRef } from 'react';
import { EditorState, Annotation } from '@codemirror/state';
import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { closeBrackets } from '@codemirror/autocomplete';
import ACTIONS from '../../utils/Actions';

// Custom annotation to mark transactions originating from the websocket server
const syncAnnotation = Annotation.define();

const Editor = ({ socketRef, roomId, onCodeChange }) => {
    const editorRef = useRef(null); // Targets the DOM container div
    const viewRef = useRef(null);   // Stores the active CodeMirror instance

    // Effect 1: Initialize CodeMirror and capture local changes
    useEffect(() => {
        if (!editorRef.current) return;

        // Create an update listener extension
        const changeListener = EditorView.updateListener.of((update) => {
            // Only emit if the text content changed AND it wasn't triggered by an incoming socket update
            if (update.docChanged && !update.transactions.some(tr => tr.annotation(syncAnnotation))) {
                const code = update.state.doc.toString();
                onCodeChange(code);
                if (socketRef.current) {
                    socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                        roomId,
                        code,
                    });
                }
            }
        });

        const state = EditorState.create({
            doc: "// Start coding here...\nconsole.log('Hello World');",
            extensions: [
                basicSetup,
                javascript(),
                dracula,
                closeBrackets(),
                changeListener,
                // Optional: Sets a baseline layout style for the editor container
                EditorView.theme({
                    "&": { height: "100%", minHeight: "500px" },
                    ".cm-scroller": { overflow: "auto" }
                })
            ]
        });

        const view = new EditorView({
            state,
            parent: editorRef.current
        });

        viewRef.current = view;

        // Cleanup: Destroys instance on unmount or hot-reload to prevent duplicate editors
        return () => {
            if (viewRef.current) {
                viewRef.current.destroy();
                viewRef.current = null;
            }
        };
    }, [roomId, socketRef.current]); 


    // Effect 2: Listen for incoming text updates from the server
    useEffect(() => {
        // We explicitly track socketRef.current so the hook triggers once the socket initializes
        if (!socketRef.current) return;

        const handleRemoteCodeChange = ({ code }) => {
            const view = viewRef.current;
            if (!view || code === null) return;

            const currentCode = view.state.doc.toString();
            
            // Only update if the incoming data differs from local content
            if (code !== currentCode) {
                view.dispatch({
                    changes: { 
                        from: 0, 
                        to: currentCode.length, 
                        insert: code 
                    },
                    // Mark this transaction so Effect 1 filters it out
                    annotations: syncAnnotation.of(true) 
                });
            }
        };

        // Bind listener
        socketRef.current.on(ACTIONS.CODE_CHANGE, handleRemoteCodeChange);

        // Cleanup: Tear down the listener when the component falls out of the DOM lifecycle
        return () => {
            if (socketRef.current) {
                socketRef.current.off(ACTIONS.CODE_CHANGE, handleRemoteCodeChange);
            }
        };
    }, [socketRef.current]);

    return (
        <div className="editor-wrapper w-full h-full">
            {/* CodeMirror 6 injects its DOM layout right inside this container div */}
            <div ref={editorRef} id="realtimeEditor"></div>
        </div>
    );
};

export default Editor;