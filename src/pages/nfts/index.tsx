import Dropdown from "@/components/Dropdown";
import Layout from "@/components/Layout";
import NFTCard from "@/components/NFTCard";
import PageNavigation from "@/components/PageNavigation";
import resolveRarity from "@/utils/resolveRarity";
import getNfts from "@/utils/supabase/get-nfts";
import { faArrowRight, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Nfts() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(true);
  const [nfts, setNfts] = useState([]);
  useEffect(() => {
    (async function () {
      const nfts = await getNfts();
      console.log(nfts.response);
      setNfts(nfts.response as any);
    })();
  }, []);
  return (
    <Layout>
      <div className="min-h-[90vh] mt-20">
        <PageNavigation />
        <div className="flex   font-theme ">
          <div className="flex w-full">
            <button
              className={`${
                filters
                  ? "bg-[#d0d1d1] text-black"
                  : "bg-[#25272b] text-[#d0d1d1] hover:bg-[#303238]"
              } flex p-3 rounded-lg  `}
              onClick={() => {
                if (filters) setFilters(false);
                else setFilters(true);
              }}
            >
              <FontAwesomeIcon
                icon={faFilter}
                className="my-auto"
              ></FontAwesomeIcon>
              <p className="font-semibold pl-3">Filters</p>
            </button>
            <input
              type="text"
              placeholder={"Search by NFTs"}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="font-theme mx-5 placeholder:font-black font-bold placeholder:text-[#6c6f70] text-md  placeholder:text-md bg-[#25272b] pl-6 text-white  rounded-lg focus:outline-none  focus:border-black w-[50%] flex-1 "
            />
          </div>
        </div>

        <div className="flex justify-between mt-10">
          {filters && (
            <div className="w-[30%]">
              <Dropdown />
            </div>
          )}
          <div>
            <div
              className={`grid ${
                filters ? "grid-cols-5" : "grid-cols-6"
              } gap-3 mx-8`}
            >
              {nfts.length > 0 &&
                nfts.map((nft: any) => {
                  return (
                    <NFTCard
                      image={nft.image}
                      imageAlt={nft.image_alt}
                      owner={nft.parent}
                      address={nft.contract_address}
                      rarity={resolveRarity(nft.rarity)}
                      tokenId={nft.token_id}
                      mode={nft.type == 0 ? "create ✨" : "breed ❤️"}
                      size={300}
                    />
                  );
                })}
            </div>
          </div>

          {/* <Link
          href={"/nfts"}
          className="bg-[#25272b] m-8 py-4 flex justify-center rounded-xl"
        >
          <p className="mr-2 font-semibold text-lg font-theme">
            View all CraftNFTs
          </p>
          <FontAwesomeIcon icon={faArrowRight} className="text-lg my-auto" />
        </Link> */}
        </div>
      </div>
    </Layout>
  );
}
