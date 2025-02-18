import React, { useState, useEffect, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import debounce from "lodash.debounce";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles for animations
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Switch,
  FormControlLabel,
  Tooltip,
  TextField,
  CircularProgress,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import "./ProductListing.css"; // Custom CSS file for hover effects

// Interface for the Product type
interface Product {
  listingId: string;
  title: string;
  description: string;
  imageUrl: string;
  isAnonymous?: boolean;
}

const ProductListing: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Create 10 different realistic products as test data
  const initialProducts: Product[] = [
    {
      listingId: "1",
      title: "Vintage Leather Jacket",
      description:
        "A stylish vintage leather jacket in excellent condition. Perfect for a casual yet chic look.",
      imageUrl: "https://picsum.photos/seed/1/400/300",
      isAnonymous: false,
    },
    {
      listingId: "2",
      title: "Electric Guitar",
      description:
        "High-quality electric guitar with minor scratches. Great for beginners and pros alike.",
      imageUrl: "https://picsum.photos/seed/2/400/300",
      isAnonymous: false,
    },
    {
      listingId: "3",
      title: "Mountain Bike",
      description:
        "Durable mountain bike suitable for off-road adventures. Gently used and ready for your next trail.",
      imageUrl: "https://picsum.photos/seed/3/400/300",
      isAnonymous: true,
    },
    {
      listingId: "4",
      title: "Gaming Laptop",
      description:
        "Powerful gaming laptop with the latest specs. Ideal for both intense gaming sessions and work.",
      imageUrl: "https://picsum.photos/seed/4/400/300",
      isAnonymous: false,
    },
    {
      listingId: "5",
      title: "Sofa Set",
      description:
        "Comfortable sofa set, perfect for your living room. Includes two sofas and a matching coffee table.",
      imageUrl: "https://picsum.photos/seed/5/400/300",
      isAnonymous: false,
    },
    {
      listingId: "6",
      title: "Dining Table",
      description:
        "Elegant dining table made of solid wood, seating up to 6 people – a perfect centerpiece for your home.",
      imageUrl: "https://picsum.photos/seed/6/400/300",
      isAnonymous: true,
    },
    {
      listingId: "7",
      title: "Smartphone",
      description:
        "Latest smartphone model in pristine condition, barely used and full of features.",
      imageUrl: "https://picsum.photos/seed/7/400/300",
      isAnonymous: false,
    },
    {
      listingId: "8",
      title: "Bookshelf",
      description:
        "Modern bookshelf with ample space for your favorite books and decor items.",
      imageUrl: "https://picsum.photos/seed/8/400/300",
      isAnonymous: false,
    },
    {
      listingId: "9",
      title: "Coffee Maker",
      description:
        "Compact and efficient coffee maker, perfect for home or office use to kickstart your mornings.",
      imageUrl: "https://picsum.photos/seed/9/400/300",
      isAnonymous: true,
    },
    {
      listingId: "10",
      title: "Running Shoes",
      description:
        "Comfortable and durable running shoes, lightly used and in excellent shape.",
      imageUrl: "https://picsum.photos/seed/10/400/300",
      isAnonymous: false,
    },
  ];

  const [products, setProducts] = useState<Product[]>(initialProducts);

  useEffect(() => {
    // Initialize AOS library for scroll animations
    AOS.init({ duration: 2000, once: true });
  }, []);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Function to generate a description using OpenAI's API
  const generateDescription = async (title: string) => {
    if (title.trim() === "") {
      setDescription("");
      return;
    }

    setIsGenerating(true);

    try {
      const prompt = `Write a very brief casual description of the given listing title with the intent of being given away but don't add any unnecessary commentary: "${title}".`;

      const gptResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 100,
        }),
      });

      const gptData = await gptResponse.json();

      if (gptData && gptData.choices && gptData.choices.length > 0) {
        const generatedDescription = gptData.choices[0].message.content.trim();
        setDescription(generatedDescription);
      } else {
        console.error("Unexpected response format:", gptData);
        setDescription("Unable to generate description at this time.");
      }
    } catch (error) {
      console.error("Error generating description:", error);
      setDescription("An error occurred while generating the description.");
    } finally {
      setIsGenerating(false);
    }
  };

  const debouncedGenerateDescription = useMemo(
    () =>
      debounce((title: string) => {
        generateDescription(title);
      }, 1000),
    []
  );

  useEffect(() => {
    if (title.trim()) {
      debouncedGenerateDescription(title);
    } else {
      setDescription("");
    }
  }, [title, debouncedGenerateDescription]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
    }
  };

  // Instead of submitting to AWS, add the new listing directly to local state
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create a temporary image URL if a file is selected; otherwise, use a placeholder image.
    const imageUrl = image ? URL.createObjectURL(image) : "https://via.placeholder.com/400x300";

    const newProduct: Product = {
      listingId: Date.now().toString(),
      title,
      description,
      imageUrl,
      isAnonymous,
    };

    setProducts([...products, newProduct]);

    // Reset form fields and close the modal
    setTitle("");
    setDescription("");
    setImage(null);
    setShowModal(false);
  };

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div style={{ width: "100%", backgroundColor: "#D3D3D3" }}>
      {/* Title and button on the same row */}
      <div className="container">
        <div className="row align-items-center mb-4" style={{ paddingTop: "60px" }}>
          <div className="col-md-10 text-center text-md-left">
            <h1 style={{ fontWeight: "bold", color: "#2B303A" }}>Marketplace</h1>
            <p style={{ color: "#555" }}>Explore listings from students on campus</p>
          </div>
          <div className="col-md-2 text-md-right text-center ml-auto px-5">
            <Button
              variant="contained"
              onClick={() => setShowModal(true)}
              style={{
                backgroundColor: "#2B303A",
                color: "white",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              +
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={showModal} onClose={() => setShowModal(false)} fullWidth maxWidth="md">
        <DialogTitle
          style={{
            backgroundColor: "#2B303A",
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Create a New Listing
        </DialogTitle>
        <DialogContent style={{ padding: "30px" }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
            <FormControlLabel
              control={
                <Switch checked={isAnonymous} onChange={() => setIsAnonymous(!isAnonymous)} />
              }
              label="Post Anonymously"
            />
            <Tooltip
              title="When the post is anonymous, the creator's name won't be visible. They can see users who interact with the post before deciding to contact them."
              placement="top"
              arrow
            >
              <InfoIcon
                style={{
                  fontSize: "20px",
                  color: "#888",
                  marginLeft: "8px",
                  cursor: "pointer",
                }}
              />
            </Tooltip>
          </div>

          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the title of the listing"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description will be generated based on the title"
            margin="normal"
            required
            disabled={isGenerating}
            InputProps={{
              endAdornment: isGenerating ? <CircularProgress size={20} /> : null,
            }}
          />

          <TextField
            fullWidth
            type="file"
            inputProps={{ accept: "image/*" }}
            onChange={handleImageChange}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="white" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "#006600", color: "white" }}
            onClick={handleSubmit}
            disabled={isGenerating}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Render the list of products */}
      <div
        className="row justify-content-around mt-5 d-flex flex-wrap"
        style={{ width: "100%", justifyContent: "space-around", paddingLeft: "17px", backgroundColor: "#D3D3D3" }}
      >
        {products.map((product) => (
          <div
            className="col-md-3 mb-4"
            key={product.listingId}
            data-aos="fade-up" // AOS fade-up animation
          >
            <div
              className="card h-100 d-flex flex-column position-relative product-card shadow-lg rounded hover-scale"
              onClick={() => handleCardClick(product)}
              style={{ transition: "transform 0.2s, box-shadow 0.2s" }}
            >
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  className="card-img-top"
                  alt={product.title}
                  style={{
                    objectFit: "cover",
                    height: "200px",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                  }}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text flex-grow-1">{product.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div
            className="modal-dialog"
            role="document"
            style={{
              maxWidth: "800px",
              width: "100%",
              minWidth: "600px",
              margin: "auto",
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              minHeight: "400px",
            }}
          >
            <div
              className="modal-content"
              style={{
                display: "flex",
                flexDirection: "row",
                minHeight: "400px",
              }}
            >
              <div style={{ width: "50%", overflow: "hidden" }}>
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.title}
                  style={{
                    objectFit: "cover",
                    height: "100%",
                    width: "100%",
                  }}
                />
              </div>

              <div
                className="modal-body"
                style={{
                  padding: "20px",
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                <div>
                  <h2 style={{ marginBottom: "10px", wordWrap: "break-word" }}>
                    {selectedProduct.title}
                  </h2>
                  {selectedProduct.isAnonymous && (
                    <h6 style={{ color: "#888", marginBottom: "20px" }}>
                      Owner: cck226@lehigh.edu
                    </h6>
                  )}
                  <p>{selectedProduct.description}</p>
                </div>

                <button
                  type="button"
                  className="btn"
                  style={{
                    alignSelf: "flex-start",
                    marginTop: "10px",
                    backgroundColor: "#2B303A",
                    color: "white",
                  }}
                  onClick={() => alert("The owner of the post has been notified!")}
                >
                  I am interested!
                </button>
                <button
                  type="button"
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    backgroundColor: "transparent",
                    border: "none",
                    fontSize: "24px",
                    cursor: "pointer",
                  }}
                  aria-label="Close"
                  onClick={closeProductModal}
                >
                  &times;
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListing;