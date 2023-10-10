
const ShowAllbooks = ({ books }) => {
   // let array = [...Object.values(books)];
    return (
      
        <div className="container">
          <div className="grid grid-cols-3 gap-4">
            {
              books.map((book,index)=>(
                <div key={index}>
                  <div class="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                  <div class="p-6">
                    <h5 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                      {book[1].title}
                    </h5>
                    <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                      {book[1].description}
                    </p>
                    <p class=" text-center block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                      --by {book[1].author}
                    </p>
                  </div>
                <div class="p-6 pt-0">
                  <button
                    class="select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    data-ripple-light="true"
                  >
                    Read More
                  </button>
            </div>
          </div>
                </div>
              ))
            }
          </div>
           
            
        </div>
    )

}

export default ShowAllbooks;