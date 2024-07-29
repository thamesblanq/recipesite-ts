import top from "../images/top.png"
import joinus from "../images/joinus.png"
import { Link } from 'react-router-dom';
import CategoryButtons from "./CategoriesBtn";
import ContentRecipeList from "./ContentRecipeList";
//import CookingVideos from "./CookingVideos";
//import InstagramFeed from "./InstagramFeed";

const Content = () => {

  const content = (
    <>
      <div className='font-inter mt-20 px-4 w-full'>
        <section className="h-[70vh] my-4 p-4">
          <article className='flex flex-col-reverse md:flex-row items-center justify-evenly h-full'>

            <div>

              <div className=" my-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold my-4 break-word font-poppins">Cook Delicious Food With <span className="font-lobster text-[#FF7426]">Foodieland.</span></h1>
                <p className="font-semibold">Are you a food lover and love to try new recipes out? If so then you've come to the right place.</p>
              </div>

              <button className="px-4 py-2 bg-[#FF7426] text-white cursor-pointer rounded-md hover:bg-[#FF7426]/80"><Link to='/recipe'>Find Recipes</Link></button>

            </div>

            <div className="hidden md:block">
              <img src={top} alt="beautiful food" className="w-full h-full items-center"/>
            </div>

          </article>
        </section>
        
        <section className="my-4 p-4 bg-gray-200 rounded-md">
          <h1 className="font-semibold text-3xl m-4">Categories</h1>
          <CategoryButtons />
        </section>

        <section>
          <article className="bg-slate-50 p-2 pb-10">
            <h1 className="font-inter text-4xl md:text-6xl font-semibold text-center">simple and tasty recipes</h1>
            <p className="font-inter text-center text-sm my-4">Meet new and old recipes with tips on ingredients to use to cook them, how to cook them and even a youtube tutorial on how to go about the whole process.</p>
            <ContentRecipeList />
            <button className="px-4 py-2 bg-black text-white cursor-pointer rounded-md hover:bg-black/80"><Link to='/recipe'>View more</Link></button>
          </article>
        </section>

        <section className="h-[70vh] my-4 p-4">
          <article className='flex flex-col-reverse md:flex-row items-center justify-evenly h-full'>

            <div>

              <div className=" my-4">
                <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold my-4 break-word font-poppins">Everyone can be a chef in their own kitchen</h1>
                <p className="">Join us today by creating an account and adding your own recipes, you can also share the link and tell people about us.</p>
              </div>

              <button className="px-4 py-2 bg-black text-white cursor-pointer rounded-md hover:bg-black/80"><Link to='/login'>Join us</Link></button>

            </div>

            <div className="hidden md:block">
              <img src={joinus} alt="beautiful food" className="w-full h-full items-center"/>
            </div>

          </article>
        </section>

        <section className="h-[70vh] my-4 p-4 flex items-center flex-col justify-center bg-purple-300 rounded-lg">
          <h1 className="text-center text-2xl font-bold my-4">Cooking Videos</h1>
          <p className="font-inter text-center">coming soon</p>
        </section>

      </div>

    </>
  )


  return content
}

export default Content