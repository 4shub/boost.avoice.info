import React, { useRef, useState } from 'react';

const PreviewContent = ({ children }: { children: any }) => {
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const previewRef = useRef();

    const copyText = () => {
        if (!previewRef.current) {
            return;
        }

        setIsCopied(true);

        // @ts-ignore
        previewRef.current.select();
        document.execCommand('copy');

        setTimeout(() => {
            setIsCopied(false);
        }, 1500);
    };

    return (
        <div className="preview-content">
            <div className="preview-content__text">
                <div className="preview-content__button-placeholder"/>
                {children}
            </div>
            <textarea
                className="preview-content__hidden-copy"
                style={{ visibility: 'hidden' }}
                ref={previewRef}
                value={children}
            />
            <button type="button" className="preview-content__button button" onClick={copyText}>
                {isCopied ? 'Copied to clipboard!' : 'Copy to clipboard'}
            </button>
        </div>
    );
};

export default PreviewContent;
