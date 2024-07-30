// app/dogGame/page.js
"use client"


import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push('/dogGame/game');
  };



    return(
        <section>
        <div className="flex justify-center items-center">
        <h1 className="mt-20 text-3xl bg-cyan-500 rounded-md shadow-xl h-14"> Welcome to the DogGuesser </h1>
        </div>
        <div className="mt-8 flex justify-center"> 
        <h2 className="text-2xl">Enter Your name to Play the Game:</h2><br></br>
        </div>
        <div className="flex justify-center">
         <input  type = "text" placeholder="Your name here" required className="h-12 w-1/4 shadow-md rounded-md mt-4 border-black border-2"></input>
         </div>
        
        <form onSubmit={handleSubmit}>
        <div className="flex justify-center">
         <button type ="submit" className="bg-cyan-500 text-white  rounded-md mt-4 h-8 w-1/5 border-black border-2">PLAY</button>
         </div>
         </form>
        
    </section>
    );
};
export default Page;