import React from 'react';
import ReactMarkdown from 'react-markdown';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

interface MarkdownEditorProps {
  content: string;
  onContentChange: (content: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  content,
  onContentChange,
}) => {
  const handleEditorChange = ({ text }: { html: string; text: string }) => {
    onContentChange(text);
  };

  return (
    <MdEditor
      value={content}
      style={{ height: '450px', borderRadius: '0.75rem', overflow: 'hidden' }}
      onChange={handleEditorChange}
      renderHTML={(text) => (
        <ReactMarkdown className='prose'>{text}</ReactMarkdown>
      )}
    />
  );
};

export default MarkdownEditor;
