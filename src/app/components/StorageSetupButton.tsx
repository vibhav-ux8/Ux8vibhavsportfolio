import { useState } from 'react';
import { Database, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { initializeStorage } from '../lib/supabase';
import { motion, AnimatePresence } from 'motion/react';

export function StorageSetupButton() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSetup = async () => {
    setStatus('loading');
    setMessage('');

    try {
      await initializeStorage();
      setStatus('success');
      setMessage('Storage initialized successfully! You can now upload images.');

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    } catch (error: any) {
      setStatus('error');
      setMessage(error.message || 'Failed to initialize storage. Please try again.');
    }
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleSetup}
        disabled={status === 'loading' || status === 'success'}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
          status === 'success'
            ? 'bg-green-100 text-green-700 cursor-not-allowed'
            : status === 'error'
            ? 'bg-red-100 text-red-700 hover:bg-red-200'
            : 'bg-primary text-white hover:bg-primary/90'
        } ${status === 'loading' ? 'opacity-60 cursor-wait' : ''}`}
      >
        {status === 'loading' && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <Loader2 className="w-4 h-4" />
          </motion.div>
        )}
        {status === 'success' && <CheckCircle className="w-4 h-4" />}
        {status === 'error' && <AlertCircle className="w-4 h-4" />}
        {status === 'idle' && <Database className="w-4 h-4" />}
        <span>
          {status === 'loading'
            ? 'Initializing Storage...'
            : status === 'success'
            ? 'Storage Ready'
            : status === 'error'
            ? 'Try Again'
            : 'Initialize Storage'}
        </span>
      </button>

      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`px-4 py-3 rounded-lg text-sm ${
              status === 'success'
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      {status === 'idle' && (
        <p className="text-xs text-muted-foreground">
          Click to create the Supabase storage bucket for image uploads. Only needed once.
        </p>
      )}
    </div>
  );
}
