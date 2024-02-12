import * as Dialog from '@radix-ui/react-dialog'
// O * pega todas as exportações que o react-dialog faz e coloca dentro de um objeto chamado Dialog
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { X } from 'lucide-react'

interface NoteCardProps {
  note: {
    date: Date
    content: string
  }
}

export function NoteCard({ note }: NoteCardProps) {
  return (
    <Dialog.Root>
      {/* O Dialog.Trigger é usado no elemento que abre o modal */}
      <Dialog.Trigger className="rounded-md text-left flex flex-col bg-slate-800 p-5 gap-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        {/* O focus aplica o CSS ao clicar no elemento, já o focus-visible aplica o CSS ao navegar na aplicação pelo teclado */}
        <span className="text-sm font-medium text-slate-300">
          {formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true})}
        </span>
        <p className="text-sm leading-6 text-slate-400">
          {note.content}
        </p>

        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
      </Dialog.Trigger>

      {/* 
        O Dialog.Portal faz com que o conteúdo dentro dele não seja mostrado no local onde está sendo colocado 
        Ele teleporta o conteúdo para a raiz da aplicação
      */}
      <Dialog.Portal>
        {/* O Dialog.Overlay é a div que cobre a aplicação toda */}
        <Dialog.Overlay className="inset-0 fixed bg-black/50">
          {/* O Dialog.Content é o que deve aparecer ao clicar no modal */}
          <Dialog.Content className="fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none">
            {/* O Dialog.Close é um botão de fechar */}
            <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
              <X className="size-5" />
            </Dialog.Close>
            
            <div className="flex flex-1 flex-col gap-3 p-5">
              {/* 
                O flex-grow indica se o elemento pode crescer ou não 
                O flex-shrink indica se o elemento pode reduzir o seu tamanho ou não baseado no tamanho dos seus irmãos
                O flex-basis é o tamanho base do elemento, ou seja, o tamanho que ele deve seguir caso não cresça nem diminua
                O flex-1 faz com que o elemento ocupe o máximo de espaço possível, mas se houver outros elementos que precisem daquele espaço, ele pode reduzir o seu tamanho
              */}
              <span className="text-sm font-medium text-slate-300">
                {formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true})}
              </span>

              <p className="text-sm leading-6 text-slate-400">
                {note.content}
              </p>
            </div>

            <button
              type="button"
              className="w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group"
            >
              Deseja <span className="text-red-400 group-hover:underline">apagar essa nota</span>?
              {/* 
                Para aplicar um estilo em um elemento baseado em um seletor do pai, utilizar a classe group no elemento pai
                Quando o grupo, que é o elemento pai onde foi colocada a classe group, estiver com o hover, colocar o underline no elemento filho
              */}
            </button>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
