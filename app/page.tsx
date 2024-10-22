import tagline from "@/assets/tagline.png";

export default function Home() {
  
  return (
    <div className="relative h-[85vh]">
      <img src={tagline.src} alt="" className="lg:absolute lg:top-[25%] lg:left-[50%] lg:w-auto w-[90%] mx-auto mt-16"/>
      
    </div>
  );
}
