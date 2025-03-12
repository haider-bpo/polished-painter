
import RockstarServicesForm from "@/components/RockstarServicesForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary text-white py-4 px-4 md:px-8 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Rockstar Painting CRM</h1>
        </div>
      </div>
      <RockstarServicesForm />
    </div>
  );
};

export default Index;
