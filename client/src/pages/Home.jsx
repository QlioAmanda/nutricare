import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Home() {
  return (
    <div className="flex-1 bg-slate-50 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl tracking-tight font-extrabold text-gray-900 sm:text-6xl md:text-7xl">
          <span className="block">Take control of your</span>
          <span className="block text-emerald-600">Daily Nutrition</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          NutriCare helps you track your meals, calculate your calorie needs, and achieve your health goals effortlessly. Start building healthier habits today.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Link to="/register">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-full px-8 py-6 text-lg">
              Get Started for Free
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" size="lg" className="text-emerald-700 border-emerald-200 hover:bg-emerald-50 font-medium rounded-full px-8 py-6 text-lg">
              Sign In
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-2xl p-8 border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-2xl mb-4">
                📊
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Track Macros</h3>
              <p className="text-gray-600">Easily log your food and see your daily breakdown of protein, carbs, and fat.</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-8 border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-2xl mb-4">
                🎯
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Hit Your Goals</h3>
              <p className="text-gray-600">Calculate your personalized BMR and TDEE to know exactly how much you need to eat.</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-8 border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-2xl mb-4">
                🥗
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Food Database</h3>
              <p className="text-gray-600">Search through our comprehensive database of healthy meals and ingredients.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;