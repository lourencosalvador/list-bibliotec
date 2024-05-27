import { DeleteBook } from "@/api/delete-book";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface librariProps {
  id: string;
  name: string;
  autorname: string;
  price: number;
}

export function DropdownMenuRech({ idBook }: { idBook: string }) {
  const queryClient = useQueryClient()
  const {mutateAsync: DeleteBookFn} = useMutation({
    mutationFn: DeleteBook,
    onSuccess(_, variables) {
      const cached = queryClient.getQueryData(['librari'])
      console.log(cached)
      queryClient.setQueryData(['librari'], (data: any) => data.filter((item: librariProps) => item.id !== variables))
    }
  })

  function deleteBook(id: string){
    DeleteBookFn(id)
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:cursor-pointer hover:bg-zinc-200 rounded">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actividades</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
      onClick={() => deleteBook(idBook)}
        >
          Deletar
        </DropdownMenuItem>
        <DropdownMenuItem>Editar</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
