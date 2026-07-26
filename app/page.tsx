import Link from "next/link";
import ButtonClicked from "./ui/ButtonClicked";





export default function Home() {
  return (
    <div>
      <h1 className="text-red-600">
        {" "}
        Hello this is nextJs basic project :{" "}
        <Link href={"/blogs"} className="text-blue-600">
          Blogs
        </Link>
       
      </h1>


      <ButtonClicked></ButtonClicked>
    </div>
  );
}
