const Contact = () => {
  return (
    <section className="bg-white rounded-lg shadow-md p-6 mt-12 mb-12">
      <h2 className="text-5xl font-extrabold text-center text-gray-900 shadow-lg">
  اتصل بنا
</h2>
<p className="text-lg text-gray-700 text-center leading-relaxed max-w-3xl mx-auto mt-4">
  إذا كان لديك أي استفسار، يمكنك التواصل عبر الوسائل التالية:
</p>
<div className="mt-6 flex justify-center gap-6">
  <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
    <h3 className="font-semibold text-gray-800">📧 البريد الإلكتروني</h3>
    <p className="text-gray-600">info@providingfood.org</p>
  </div>
  <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
    <h3 className="font-semibold text-gray-800">☎️ الهاتف</h3>
    <p className="text-gray-600">+123 456 789</p>
  </div>
  <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
    <h3 className="font-semibold text-gray-800">🌍 وسائل التواصل</h3>
    <p className="text-gray-600">Twitter - Facebook - LinkedIn</p>
  </div>
</div>

    </section>
  );
};

export default Contact;
