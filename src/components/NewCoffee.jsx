import Swal from "sweetalert2";

const NewCoffee = () => {
  const handleAddCoffee = (e) => {
    e.preventDefault();

    const newCoffee = Object.fromEntries(new FormData(e.target));

    console.log(newCoffee);

    fetch("http://localhost:5000/coffee/new", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newCoffee),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          e.target.reset();
          Swal.fire({
            title: "Success!",
            text: "Added new coffee!",
            icon: "success",
            confirmButtonText: "Done",
          });
        }
      });
  };
  return (
    <div className="p-16 bg-sky-100 md:m-16 md:rounded-lg">
      <h2 className="text-2xl md:text-4xl font-bold mb-8 mx-auto w-fit">
        New coffee
      </h2>
      <form onSubmit={handleAddCoffee}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            className="input input-bordered flex items-center gap-2"
            placeholder="Coffee Name"
            name="name"
          />
          <input
            type="text"
            className="input input-bordered flex items-center gap-2"
            placeholder="Quantity"
            name="quantity"
          />
          <input
            type="text"
            className="input input-bordered flex items-center gap-2"
            placeholder="Supplier"
            name="supplier"
          />
          <input
            type="text"
            className="input input-bordered flex items-center gap-2"
            placeholder="Taste"
            name="taste"
          />
          <input
            type="text"
            className="input input-bordered flex items-center gap-2"
            placeholder="Category"
            name="category"
          />
          <input
            type="text"
            className="input input-bordered flex items-center gap-2"
            placeholder="Details"
            name="details"
          />
        </div>
        <input
          type="text"
          className="input input-bordered flex items-center gap-2 w-full"
          placeholder="Photo Url"
          name="photo"
        />
        <input
          type="submit"
          value="Add Coffee"
          className="btn btn-accent w-full mt-4"
        />
      </form>
    </div>
  );
};

export default NewCoffee;
