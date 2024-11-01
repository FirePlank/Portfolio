import DownloadCVButton from "@/components/DownloadCVButton";
import Social from "@/components/ui/Social";
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";

const Home = () => {
    return <section className="h-full">
        <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between md:pt-8 md:pb-24">
                <div className="text-center md:text-left order-2 md:order-none">
                    <span className="text-xl">
                        Software Developer
                    </span>
                    <h1 className="h1">
                        Hello, I&#39;m <br/><span className="text-accent">Jesse Sissala</span>
                    </h1>
                    <p className="max-w-[500px] mb-9 mt-4 text-white/80 text-lg">
                        I am passionate about learning and building with diverse technologies and frameworks.
                    </p>
                    { /* Social Links */}
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <DownloadCVButton/>
                        <div className="mb-8 md:mb-0">
                            <Social containerStyles="flex gap-6"
                                    iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"/>
                        </div>
                    </div>
                </div>
                {/* Photo */}
                <div className="order-1 md:order-none mb-8 md:mb-0">
                    <Photo/>
                </div>
            </div>
        </div>
        <Stats/>
    </section>
};

export default Home;