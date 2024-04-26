import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components"
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { Props } from "../utils/interface.dto";
import { useSelector } from "react-redux";
import { RootState } from '../redux/rootReducer';
import StripeCheckout, { Token } from "react-stripe-checkout";
import { useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { userRequest } from '../axios';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px"})}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  cursor: pointer;
  border: ${(props: Props) => props.typeButton === "filled" && "none"};
  background-color: ${(props: Props)=> props.typeButton === "filled" ? "black" : "transparent"};
  color: ${(props: Props) => props.typeButton === "filled" && "white" };
`;

const TopTexts = styled.div`
  ${mobile({ display: "none"})}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column"})}
`;

const Info = styled.div`
  flex: 3;
`;


const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column"})}
`;

const ProductDetail = styled.div`
flex: 2;
display: flex;
`;

const Image = styled.img`
width: 200px;
`;

const Details = styled.div`
padding: 20px;
display: flex;
flex-direction: column;
justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
width: 20px;
height: 20px;
border-radius: 50%;
background-color: ${(props)=> props.color};
`;

const ProductSize = styled.span``;



const PriceDetail = styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`;

const ProductAmountContainer = styled.div`
display: flex;
align-items: center;
margin-bottom: 20px;
`;

const ProductAmount = styled.span`
font-size: 24px;
margin: 5px;
${mobile({ margin: "5px 15px"})}
`;

const ProductPrice = styled.span`
font-size: 30px;
font-weight: 200;
${mobile({ marginBottom: "20px"})}
`;

const Hr = styled.hr`
background-color: #eee;
border: none;
height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props: Props)=>props.type === "total" && "500"};
  font-size: ${(props: Props)=>props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const StyledStripeCheckoutButton = styled(StripeCheckout)`
  width: 100%;
  padding: 10px;
  background-color: green;
  color: white;
  cursor: pointer;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  cursor: pointer;
`;


const Key = process.env.REACT_APP_STRIPE_KEY;

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const [stripeToken, setStripeToken] = useState(null)
  const navigate = useNavigate();
  
  const onToken = (token: Token) => {
    setStripeToken(token);
  }
  
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("api/checkout", {
          tokenId: stripeToken.id,
          amount: cart.total * 100
        });
        navigate("/success", { state: { data: res.data } });
      } catch (error) {
        console.log(error)
      }
    }
    stripeToken && cart.total >= 1 && makeRequest();
  }, [stripeToken, cart.total, navigate])

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR CART</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Cart(2)</TopText>
            <TopText>Your Wishlist(0)</TopText>
          </TopTexts>
          <TopButton typeButton="filled">CHECK OUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product>
              <ProductDetail>
                <Image src={product.image}/>
                <Details>
                  <ProductName><b>Product:</b> {product.title}</ProductName>
                  <ProductId><b>ID:</b> {product._id}</ProductId>
                  <ProductColor color={product.color}/>
                  <ProductSize><b>Size:</b>{product.size}</ProductSize>
                </Details>
              </ProductDetail>  
              <PriceDetail>
                <ProductAmountContainer>
                  <Add />
                  <ProductAmount>{product.quantity}</ProductAmount>
                  <Remove />
                </ProductAmountContainer>
                <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
              </PriceDetail>  
            </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StyledStripeCheckoutButton
              name="SmileMart"
              image="https://res.cloudinary.com/dixoaggbe/image/upload/v1686610904/user_wkqh8v.png"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={Key}
            />
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  )
}

export default Cart