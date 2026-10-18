import { Sidebar, SidebarHeader } from '@/components/ui/sidebar';

const PlayIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="Ícone do Conversor de Arquivos Ruiz">
    <circle cx="32" cy="32" r="32" fill="#2E7D32" />
    <path d="M26 20 L26 44 L44 32 Z" fill="#3E2723" />
  </svg>
);

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <PlayIcon size={24} />
          <span className="font-semibold text-white">Conversor Ruiz</span>
        </div>
      </SidebarHeader>
    </Sidebar>
  );
}

export default AppSidebar;
