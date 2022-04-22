import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import LayoutsWithNavbar from "./components/LayoutsWithNavbar"
import Login from "./pages/login"
import Customers from "./pages/customers"
import Todo from "./pages/todo"
import NotFound from "./pages/notFound"
import NewCustomer from "./pages/newCustomer"
import SingleCustomer from "./pages/singleCustomer"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutsWithNavbar />}>
          <Route index element={<Todo />} />
          <Route path="customers" element={<Customers />} />
          <Route path="customers/:customerId" element={<SingleCustomer />} />
          <Route path="todo" element={<Todo />} />
          <Route path="new/customer" element={<NewCustomer />} />

          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
