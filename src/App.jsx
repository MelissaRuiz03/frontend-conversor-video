import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import AppSidebar from '@/components/AppSidebar';
import ConverterForm from '@/components/ConverterForm';
import StarfieldBackground from '@/components/StarfieldBackground';
import ParticleText from '@/components/ParticleText';

const HEADLINE = 'Transforme vídeos do YouTube em arquivos MP3';
const HEADLINE_LINES = ['Transforme vídeos do YouTube', 'em arquivos MP3'];

const steps = [
  { title: '1. Cole o link', description: 'Cole o link do vídeo do YouTube que você quer converter.' },
  { title: '2. Converta', description: 'Clique em converter e aguarde o processamento do áudio.' },
  { title: '3. Baixe o MP3', description: 'Baixe o MP3 gerado direto no seu celular ou computador.' },
];

function App() {
  return (
    <TooltipProvider>
      <div className="pointer-events-none fixed inset-0 -z-10">
        <StarfieldBackground />
      </div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-transparent">
          <header className="flex h-14 items-center gap-2 border-b border-white/10 bg-black/30 px-4 text-white backdrop-blur-md">
            <SidebarTrigger />
            <span className="font-medium">Conversor de Arquivos Ruiz</span>
          </header>

          <main className="flex flex-1 flex-col items-center gap-10 px-4 py-10">
            <div className="flex flex-col items-center gap-3 text-center">
              <h1 className="sr-only">{HEADLINE}</h1>
              <div aria-hidden="true" className="flex w-full flex-col items-center gap-0 text-white">
                {HEADLINE_LINES.map((line, index) => (
                  <div key={line} className="h-20 w-full sm:h-28">
                    <ParticleText
                      text={line}
                      style={{ minHeight: 0 }}
                      fontSize="clamp(2.25rem, 10vw, 6rem)"
                      fontWeight={700}
                      particleSize={2.5}
                      density={2.5}
                      color="currentColor"
                      highlightColor="#22c55e"
                      highlightMode="motion"
                      intro="gather"
                      trigger="mount"
                      gatherDuration={1400}
                      stagger={300 + index * 150}
                      scatter={140}
                      clickBurst
                      pointerRepel={35}
                      repelRadius={100}
                      idleDrift={0.5}
                      glow
                    />
                  </div>
                ))}
              </div>
              <p className="max-w-md text-zinc-300">
                Cole o link do vídeo que você quer converter. O site extrai o áudio e gera um
                arquivo MP3 pronto para baixar, direto do seu navegador.
              </p>
            </div>

            <ConverterForm />

            <section id="como-funciona" className="grid w-full max-w-3xl gap-4 sm:grid-cols-3">
              {steps.map((step) => (
                <Card key={step.title} className="border-white/10 bg-white/5 text-white backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-base">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-zinc-300">
                    {step.description}
                  </CardContent>
                </Card>
              ))}
            </section>

            <Alert id="uso-responsavel" className="max-w-3xl border-white/10 bg-white/5 text-white backdrop-blur-md">
              <AlertTitle>Uso responsável</AlertTitle>
              <AlertDescription className="text-zinc-300">
                Converta apenas vídeos sobre os quais você tem direito de uso (seus próprios
                vídeos, conteúdo com licença Creative Commons ou domínio público). Converter
                músicas de terceiros sem autorização pode violar direitos autorais e os Termos
                de Uso do YouTube.
              </AlertDescription>
            </Alert>
          </main>

          <footer className="border-t border-white/10 bg-black/30 px-4 py-6 text-center text-sm text-zinc-300 backdrop-blur-md">
            Conversor de Arquivos Ruiz — projeto pessoal de portfólio.
          </footer>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}

export default App;
