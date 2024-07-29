import top from "../images/top.png"
import { Link } from 'react-router-dom';
import CategoryButtons from "./CategoriesBtn";

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

              <button className="px-4 py-2 bg-[#FF7426] font-semibold text-white cursor-pointer rounded-md hover:bg-[#FF7426]/80"><Link to='/recipe'>Find Recipes</Link></button>

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
          
        </section>
      </div>

    </>
  )


  return content
}

export default Content