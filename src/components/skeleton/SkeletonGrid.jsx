import SkeletonCard from "./SkeletonCard";

function SkeletonGrid({ count = 8 }) {

    return (
        <div className="illustration-container">

            {Array.from({ length: count }).map((_, index) => (
                <SkeletonCard key={index} />
            ))}

        </div>
    );

}

export default SkeletonGrid;