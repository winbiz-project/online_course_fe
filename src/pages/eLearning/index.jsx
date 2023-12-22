import CardLearning from "@/components/card/learningPath";
import CardNews from "@/components/card/news";
import Layout from "@/components/layout";

import learningImg from "@/assets/images/learning-path-1.png";

const ELearning = () => {
    const dataLearning = {
        title: "Digital Marketing",
        image: learningImg,
        material: 109,
        topic: 5,
        users: 100,
        rating: 4

    }

    return (
        <Layout >
            <div className="m-8 space-y-4">
                <CardNews />
                <CardLearning learning={dataLearning} />
            </div>
        </Layout>
    );
};

export default ELearning;