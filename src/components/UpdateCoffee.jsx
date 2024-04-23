import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateCoffee = () => {
  const coffee = useLoaderData();
  const { _id, details, name, category, photo, quantity, supplier, taste } =
    coffee;
  const handleUpdateCoffee = (e) => {
    e.preventDefault();

    const newCoffee = Object.fromEntries(new FormData(e.target));

    console.log(newCoffee);

    fetch(`http://localhost:5000/coffee/update/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newCoffee),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          e.target.reset();
          Swal.fire({
            title: "Success!",
            text: "Update coffee successfully!",
            icon: "success",
            confirmButtonText: "Done",
          });
        }
      });
  };
  return (
    <div className="p-16 bg-sky-100 md:m-16 md:rounded-lg">
      <h2 className="text-2xl md:text-4xl font-bold mb-8 mx-auto w-fit">
        Update coffee
      </h2>
      <form onSubmit={handleUpdateCoffee}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            className="input input-bordered flex items-center gap-2"
            placeholder="Coffee Name"
            name="name"
            defaultValue={name}
          />
          <input
            type="text"
            className="input input-bordered flex items-center gap-2"
            placeholder="Quantity"
            name="quantity"
            defaultValue={quantity}
          />
          <input
            type="text"
            className="input input-bordered flex items-center gap-2"
            placeholder="Supplier"
            name="supplier"
            defaultValue={supplier}
          />
          <input
            type="text"
            className="input input-bordered flex items-center gap-2"
            placeholder="Taste"
            name="taste"
            defaultValue={taste}
          />
          <input
            type="text"
            className="input input-bordered flex items-center gap-2"
            placeholder="Category"
            name="category"
            defaultValue={category}
          />
          <input
            type="text"
            className="input input-bordered flex items-center gap-2"
            placeholder="Details"
            name="details"
            defaultValue={details}
          />
        </div>
        <input
          type="text"
          className="input input-bordered flex items-center gap-2 w-full"
          placeholder="Photo Url"
          name="photo"
          defaultValue={photo}
        />
        <input
          type="submit"
          value="Update Coffee"
          className="btn btn-accent w-full mt-4"
        />
      </form>
    </div>
  );
};

export default UpdateCoffee;
