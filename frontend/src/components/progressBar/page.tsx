import Image from "next/image";
import Link from "next/link";
const ProgressBar = ({
  progress,
  heart,
}: {
  progress: number;
  heart: number;
}) => {
  const progressSteps = [15, 30, 45, 60, 75, 90, 100];
  const widthProg = Number(progress);
  return (
    <div className="max-w-3xl ms-auto me-auto pt-9">
      <div className="max-w-[90vw] flex justify-between ms-auto me-auto self-center items-center gap-2">
        <Link href={"/"}>
          {" "}
          <Image
            src="https://d35aaqx5ub95lt.cloudfront.net/images/df223d5b9feb8017b323ed21103eb5ac.svg"
            alt=""
            // className="max-h-5"
            width={20}
            height={20}
          />
        </Link>
        <div className="progress-bar w-[70vw] bg-neutral-400 rounded-lg relative max-h-5 h-5">
          {progressSteps.map(
            (step, index) =>
              widthProg >= step && (
                <div
                  key={index}
                  className="absolute bg-red-400 z-10 h-full rounded-lg transition-all duration-300"
                  style={{ width: `${step}%` }}
                ></div>
              )
          )}
        </div>
        <div className="flex items-center gap-1">
          <Image
            src={"/heart.png"}
            alt="heart"
            width={30}
            height={30}
            className="max-h-8"
          />
          <span className="text-[#DC2219] font-bold">{heart}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
