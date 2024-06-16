import {QueryProvider} from "@/lib/react-query/QueryProvider";
import {Inter} from "next/font/google";
import "../../../styles/globals.css";
import {Toaster} from "@/components/ui/toaster";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="fr" className="min-h-screen">
        <body className={`${inter.className} flex  justify-center `}>
        <QueryProvider>
            <div className="flex flex-grow items-stretch">
                <div className="relative flex-grow  w-full">
                    <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px]">
                        <img
                            src="https://fastly.picsum.photos/id/426/200/300.jpg?hmac=ATVZT7wbjRxxBKYqLXE043ImnR_uNOkz00T9dWGYuow"
                            alt="Image 1" className="w-full h-full rounded-xl"/>
                    </div>
                    <div className="absolute top-[30%] left-[30%] w-[400px] h-[400px]">
                        <img
                            src="https://fastly.picsum.photos/id/1026/200/300.jpg?hmac=Thvj4aJ_VnAGT6DKAcy1yTs100zlstJTyImDWphGDFI"
                            alt="Image 2" className="w-full h-full rounded-xl"/>
                    </div>
                    <div className="absolute top-[50%] left-[20%] w-[400px] h-[400px]">
                        <img
                            src="https://fastly.picsum.photos/id/142/200/300.jpg?hmac=B08HyXonHhJPFpULUNgMfoCFGZqymUB3NhBxo3iWTnc"
                            alt="Image 3" className="w-full h-full rounded-xl"/>
                    </div>
                </div>

                <div className="flex-grow h-full w-full bg-[rgba(49,106,119,0.25)] ">
                    {children}
                </div>
            </div>
            <Toaster />
        </QueryProvider>
        </body>
        </html>
    );
}