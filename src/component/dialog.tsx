import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { useForm } from "react-hook-form";
import { z } from "zod";
import loadingGif from "../../public/livro.gif";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postBook } from "@/api/post-book";

interface librariProps {
  id: number;
  name: string;
  autorname: string;
  price: number;
}

const librariSchema = z.object({
  name: z.string(),
  autorname: z.string(),
  price: z.coerce.number(),
});

type LibrariSchema = z.infer<typeof librariSchema>;

export function DialogTech() {
  const { register, handleSubmit } = useForm<LibrariSchema>({
    resolver: zodResolver(librariSchema),
  });

  const queryClient = useQueryClient();

  const { mutateAsync: postBoookFn } = useMutation({
    mutationFn: postBook,
    onSuccess(_, variables) {
      queryClient.setQueryData(["librari"], (data: librariProps[]) => {
        return [
          ...data,
          {
            id: crypto.randomUUID(),
            name: variables.name,
            autorname: variables.autorname,
            price: variables.price,
          },
        ];
      });
    },
  });

  async function handleSubmitLibrari(data: LibrariSchema) {
    try {
      await postBoookFn({
        id: crypto.randomUUID(),
        name: data.name,
        autorname: data.autorname,
        price: data.price,
      });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-zinc-900 text-slate-100 hover:bg-zinc-800 hover:text-slate-200"
          variant="outline"
        >
          Adicionar livro
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex w-full ">
          <DialogHeader>
            <DialogTitle>Adicionar Livro</DialogTitle>
            <DialogDescription>
              Adiciona o livro na livraria do labri
            </DialogDescription>
          </DialogHeader>
          <img
            src={loadingGif}
            alt="loading..."
            className="size-10 ml-[40px]"
          />
        </div>
        <form
          onSubmit={handleSubmit(handleSubmitLibrari)}
          className="grid gap-4 py-4"
        >
          <div className="flex flex-col  gap-4">
            <Label htmlFor="name" className="">
              Name do livro
            </Label>
            <Input id="name" {...register("name")} className="col-span-3" />
          </div>
          <div className="flex flex-col  gap-4">
            <Label htmlFor="autorname">Autor</Label>
            <Input
              id="autorname"
              {...register("autorname")}
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col  gap-4">
            <Label htmlFor="price">Preço</Label>
            <Input
              id="price"
              {...register("price")}
              className="col-span-3 outline-none"
            />
          </div>
          <DialogFooter>
            <Button type="submit">Criar Livro</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
