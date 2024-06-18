import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function SearchBar() {
    return (
        <div className="relative text-black flex items-center max-w-md mx-auto w-full">
            <Input
                type="search"
                placeholder="Rechercher..."
                className="w-full pr-10"
            />
            <div className="absolute right-2 cursor-pointer">
                <Image
                    src="/assets/icons/loupe.svg"
                    alt="Search Icon"
                    width={24}
                    height={24}
                />
            </div>
        </div>
    )
}