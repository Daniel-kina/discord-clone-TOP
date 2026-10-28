import { Contact } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import ServerButton from "../components/ServerButton";
export default function MessageView() {
  return (
    <div className="grid grid-cols-1 relative max-[1300px]:grid-cols-[100px_250px_1fr] min-[1301px]:grid-cols-[100px_250px_1fr] gap-4 h-screen">
      {/* Column 1:*/}
      <div className="bg-blue-100  p-4 rounded-lg shadow flex flex-col items-center">
        <div className=" w-14 h-14 bg-gray-400 border-blue-600 flex justify-center items-center rounded-3xl cursor-pointer">
          <FaDiscord className="w-8 h-8 text-indigo-600"></FaDiscord>
        </div>

        <div className="h-px w-[70%] bg-gray-600 my-4" />

        <div className="flex flex-col gap-3">
          <ServerButton></ServerButton>
          <ServerButton></ServerButton>
          <ServerButton></ServerButton>
        </div>
      </div>

      {/* Column 2:*/}
      <div className="bg-green-100 p-4 rounded-lg shadow">
        <div className="border p-3 rounded-tl-2xl">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search for Friends..."
            className="text-white  bg-gray-600 w-full"
          />
        </div>
        <div className="border-l ">
          <div className="flex flex-col items-start">
            <div className="grid grid-cols-[30px_170px] justify-items-start p-2 hover:bg-gray-400 transition-colors duration-100 rounded-lg cursor-pointer">
              <Contact></Contact>
              <div>Friends</div>
            </div>

            <div className="grid grid-cols-[30px_170px] justify-items-start p-2 hover:bg-gray-400 transition-colors duration-100 rounded-lg cursor-pointer">
              <Contact></Contact>
              <div>Nachrichtenanfragen</div>
            </div>

            <div className="grid grid-cols-[30px_170px] justify-items-start p-2 hover:bg-gray-400 transition-colors duration-100 rounded-lg cursor-pointer">
              <Contact></Contact>
              <div>Nitro</div>
            </div>

            <div className="grid grid-cols-[30px_170px] justify-items-start p-2 hover:bg-gray-400 transition-colors duration-100 rounded-lg cursor-pointer">
              <Contact></Contact>
              <div>Shop</div>
            </div>

            <div className="grid grid-cols-[30px_170px] justify-items-start p-2 hover:bg-gray-400 transition-colors duration-100 rounded-lg cursor-pointer">
              <Contact></Contact>
              <div>Quests</div>
            </div>
          </div>

          <div className="ml-2 h-px w-[90%] bg-gray-600 my-2" />

          <div>
            <div className="flex justify-between pl-2">
              <span>Direktnachrichten</span>
              <i className="cursor-pointer">+</i>
            </div>

            <div className="flex flex-col ">
              <div className="flex gap-2 py-1 items-center hover:bg-gray-400 transition-colors duration-100 rounded-lg cursor-pointer">
                <div className="w-12 h-12 relative ml-2">
                  <img className="rounded-4xl" src="/funny-cat-35.jpg" alt="" />
                  <div className=" w-3 h-3 bg-black border-3 border-gray-400 rounded-4xl absolute top-[75%] right-[10%]"></div>
                </div>
                <div className="text-2xl">Faisal</div>
              </div>

              <div className="flex gap-2 py-1 items-center hover:bg-gray-400 transition-colors duration-100 rounded-lg cursor-pointer">
                <div className="w-12 h-12 relative ml-2">
                  <img className="rounded-4xl" src="/funny-cat-35.jpg" alt="" />
                  <div className=" w-3 h-3 bg-black border-3 border-gray-400 rounded-4xl absolute top-[75%] right-[10%]"></div>
                </div>
                <div className="text-2xl">Deniz</div>
              </div>

              <div className="flex gap-2 py-1 items-center hover:bg-gray-400 transition-colors duration-100 rounded-lg cursor-pointer">
                <div className="w-12 h-12 relative ml-2">
                  <img className="rounded-4xl" src="/funny-cat-35.jpg" alt="" />
                  <div className=" w-3 h-3 bg-black border-3 border-gray-400 rounded-4xl absolute top-[75%] right-[10%]"></div>
                </div>
                <div className="text-2xl">Diyar</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Column 3:*/}
      <div className="bg-yellow-100 p-4 rounded-lg shadow">
        Column 3
        <div>
          <div>Faisal.... und andere User falls gruppe</div>
          <div>
            <button>
              <i>Call</i>
            </button>
            <button>
              <i>video Call</i>
            </button>
            <button>
              <i>pinned Messages</i>
            </button>
            <button>
              <i>create Group</i>
            </button>
            <button>
              <i>Nutzerprofil/Mitgliederliste verbergen</i>
            </button>
            <input type="text" placeholder="Nachrichten durchsuchen" />
          </div>
        </div>
        <div>Chat Window</div>
        <div>
          <div>
            <i>+(Files)</i>
          </div>
          <div>
            <input type="text" placeholder="Nachricht an @Faisal" />
          </div>
          <div>
            <i>Gift</i>
            <i>GIF</i>
            <i>Sticker</i>
            <i>Emotes</i>
            <i>Games</i>
          </div>
        </div>
      </div>

      <div
        className="bg-amber-900 w-[375px] h-3 absolute bottom-1
      "
      ></div>
    </div>
  );
}
