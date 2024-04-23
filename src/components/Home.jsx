import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const Home = () => {
  const [coffees, setCoffees] = useState(useLoaderData());
  console.log(coffees);
  return (
    <div className="p-16 bg-sky-100 md:m-16 md:rounded-lg">
      <h2 className="text-2xl md:text-4xl font-bold mb-8 mx-auto w-fit">
        Coffees : {coffees.length}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {coffees.map((coffee) => {
          const { _id, name, photo, quantity, supplier, taste } = coffee;
          const handleDelete = () => {
            console.log(_id);
            Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!",
            }).then((result) => {
              if (result.isConfirmed) {
                fetch(`http://localhost:5000/coffee/delete/${_id}`, {
                  method: "DELETE",
                })
                  .then((res) => res.json())
                  .then((data) => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                      const newCoffees = coffees.filter(
                        (coffee) => coffee._id !== _id
                      );
                      setCoffees(newCoffees);
                      Swal.fire({
                        title: "Deleted!",
                        text: "Your coffee has been deleted.",
                        icon: "success",
                      });
                    }
                  });
              }
            });
          };
          return (
            <div
              key={coffee._id}
              className="flex flex-col md:flex-row bg-green-100 border-2 border-green-300 p-4 rounded-lg"
            >
              <div className="grow flex items-center gap-2">
                <div>
                  <img src={photo} alt="" />
                </div>
                <div className="flex flex-col justify-between grow">
                  <h2 className="text-2xl font-bold">{name}</h2>
                  <p>{quantity}</p>
                  <p>{supplier}</p>
                  <p>{taste}</p>
                </div>
              </div>
              <div className="w-full md:w-fit flex md:flex-col justify-center gap-2">
                <button className="btn btn-primary md:w-full">View</button>
                <Link to={`/coffee/update/${_id}`}>
                  <button className="btn btn-accent md:w-full">Update</button>
                </Link>
                <button
                  className="btn btn-error md:w-full"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
