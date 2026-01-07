import React, { useState, useEffect } from 'react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (key: string) => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onSave }) => {
  const [key, setKey] = useState('');

  useEffect(() => {
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) setKey(storedKey);
  }, [isOpen]);

  const handleSave = () => {
    if (key.trim()) {
      localStorage.setItem('gemini_api_key', key.trim());
      onSave(key.trim());
      onClose();
    }
  };

  const handleClear = () => {
    localStorage.removeItem('gemini_api_key');
    setKey('');
    onSave(''); // Notify parent that key is gone
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100">
        <div className="bg-indigo-600 p-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
            market sync configuration
          </h2>
          <p className="text-indigo-100 text-sm mt-1">Enter your Gemini API Key to enable live AI features.</p>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="text-sm text-slate-600 leading-relaxed">
            <p className="mb-2">Your key is stored <strong>locally in your browser</strong> and is never sent to our servers.</p>
            <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-bold hover:underline flex items-center gap-1">
              Test Get a free Gemini API Key
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          </div>

          <div className="relative">
             <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Paste your API key here (AIza...)"
              className="w-full p-4 pl-11 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-mono text-sm text-slate-800"
            />
            <svg className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>

          <div className="flex gap-3 pt-2">
            <button 
              onClick={handleSave}
              className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-[0.98]"
            >
              Save Key
            </button>
            {key && (
              <button 
                onClick={handleClear}
                className="px-4 py-3 text-slate-500 font-bold hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
              >
                Clear
              </button>
            )}
             <button 
                onClick={onClose}
                className="px-4 py-3 text-slate-400 font-bold hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
              >
                Close
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;
