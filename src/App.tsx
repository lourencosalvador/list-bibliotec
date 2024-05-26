import { useQuery } from "@tanstack/react-query";
import { Header } from "./component/header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import { getDataLibrari } from "./api/get-book";
import { DropdownMenuRech } from "./component/dropdow-menu";

interface librariProps {
  id: number;
  name: string;
  autorname: string;
  price: number;
}

export default function Home() {
  const { data: librari } = useQuery({
    queryKey: ["librari"],
    queryFn: getDataLibrari,
  });
  return (
    <div className=" p-6 max-w-4xl mx-auto ">
      <Header />
      <div className="border rounded-lg p-2">
        <Table>
          <TableHeader>
            <TableHead>ID</TableHead>
            <TableHead>Livro</TableHead>
            <TableHead>Autor</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Actividades</TableHead>
          </TableHeader>
          <TableBody>
            {librari?.map((libri: librariProps) => (
              <TableRow key={libri.id}>
                <TableCell>{libri.id}</TableCell>
                <TableCell>{libri.name}</TableCell>
                <TableCell>{libri.autorname}</TableCell>
                <TableCell>
                  {libri.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "brl",
                  })}
                </TableCell>
                <TableCell>
                  <DropdownMenuRech idBook={libri.id.toString()}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
