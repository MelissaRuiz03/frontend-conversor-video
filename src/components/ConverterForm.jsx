import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function ConverterForm() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ kind: '', message: '' });

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setStatus({ kind: '', message: '' });

    try {
      const res = await fetch(`${API_URL}/convert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Erro ao converter.');
      }

      const blob = await res.blob();
      const disposition = res.headers.get('Content-Disposition') || '';
      const match = disposition.match(/filename="(.+)"/);
      const filename = match ? match[1] : 'audio.mp3';

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();

      setStatus({ kind: 'ok', message: 'Download iniciado!' });
    } catch (err) {
      setStatus({ kind: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card id="converter" className="w-full max-w-md border-white/10 bg-white/5 text-white backdrop-blur-md">
      <CardHeader>
        <CardTitle>Converter vídeo para MP3</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="border-white/20 bg-white/5 text-white placeholder:text-zinc-400"
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Convertendo...' : 'Converter para MP3'}
          </Button>
        </form>

        {status.kind === 'error' && (
          <Alert variant="destructive" className="border-red-400/30 bg-red-500/10 text-red-300">
            <AlertTitle>Não foi possível converter</AlertTitle>
            <AlertDescription className="text-red-300/80">{status.message}</AlertDescription>
          </Alert>
        )}

        {status.kind === 'ok' && (
          <Alert className="border-emerald-400/30 bg-emerald-500/10 text-emerald-300">
            <AlertTitle>Pronto</AlertTitle>
            <AlertDescription className="text-emerald-300/80">{status.message}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

export default ConverterForm;
