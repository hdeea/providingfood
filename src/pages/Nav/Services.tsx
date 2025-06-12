import { Heart, Users, Utensils, Gift, UserPlus, HandHeart } from "lucide-react";

const Services = () => {
  return (
    <section className="bg-white rounded-lg shadow-md p-6 mt-12 mb-12">
    <h2 className="text-5xl font-extrabold text-center text-gray-900 shadow-lg">
  خدماتنا
</h2>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
  <div className="text-center bg-gray-50 p-6 rounded-lg shadow-lg hover:bg-gray-300 transition-all duration-300">
    <HandHeart className="w-12 h-12 text-green-600 mx-auto mb-3" />
    <h3 className="font-semibold text-xl text-gray-700">التبرعات الفردية</h3>
    <p className="text-gray-600 mt-2 leading-relaxed">
      نربط الأفراد الراغبين في التبرع بالطعام بالفئات المحتاجة، مما يساعد على توفير وجبات طازجة بدلًا من إهدارها.
    </p>
  </div>
  <div className="text-center bg-gray-50 p-6 rounded-lg shadow-lg hover:bg-gray-300 transition-all duration-300">
    <Utensils className="w-12 h-12 text-purple-600 mx-auto mb-3" />
    <h3 className="font-semibold text-xl text-gray-700">تعاون المطاعم</h3>
    <p className="text-gray-600 mt-2 leading-relaxed">
      نشجع المطاعم على تقديم الطعام الفائض بطريقة صحية وآمنة لمن يحتاجون إليه، ما يساعد في الاستدامة وتقليل الفائض.
    </p>
  </div>
  <div className="text-center bg-gray-50 p-6 rounded-lg shadow-lg hover:bg-gray-300 transition-all du ration-300">
    <Heart className="w-12 h-12 text-red-600 mx-auto mb-3" />
    <h3 className="font-semibold text-xl text-gray-700">إدارة الطلبات</h3>
    <p className="text-gray-600 mt-2 leading-relaxed">
      نوفر منصة ذكية تمكن الجمعيات من تنسيق الطلبات بين الجهات المتبرعة والمحتاجين، لضمان وصول الطعام إلى مستحقيه.
    </p>
  </div>
</div>

    </section>
  );
};

export default Services;
