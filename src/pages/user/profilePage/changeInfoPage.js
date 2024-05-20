import { memo, useState, useEffect } from "react";
import {jwtDecode} from 'jwt-decode';
import "./style.css";
import axios from "axios";

const ChangeInfoPage = () => {
  const [formData, setFormData] = useState([]);

  const saveUserInfo = async () => {
    try {
      const request = await axios.post('http://localhost:3001/api/v1/user/change-information', {
        customer_id:customerID,
        name: formData.name,
        account_name: formData.account_name,
        email: formData.email,
        CCCD: formData.CCCD,
        phone_number: formData.phone_number,
        // gender: formData.gender,
        // date_of_birth: formData.dob_year+'/'+formData.dob_month+'/'+formData.dob_day,
      });
  
      console.log(request); // Xử lý kết quả trả về từ server tại đây
      //console.log('ngày',formData.dob_day);
    } 
    catch (error) {
      console.error('Error:', error);
    }
  }; 
  // const [formData, setAccountInfo] = useState([]);
  // const [customerID, setCustomerID] = useState(null);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     const decodedToken = jwtDecode(token);
  //     console.log(decodedToken);
  //     setCustomerID(decodedToken.id); // Giả sử 'id' trong token là customerID
  //   } else {
  //     console.log("Không tìm thấy token")
  //   }
  // }, []);
  
  // const fetchMenuItems = async (customerID) => {
  //   try {
  //     const response = await fetch(`http://localhost:3001/api/v1/user/change-information/${customerID}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     if (!response.ok) {
  //       throw new Error(`Network response was not ok: ${response.statusText}`);
  //     }
  //     const data = await response.json();
  //     console.log('dữ liệu user:', data);
  //     console.log('ID đây:', customerID);
  //     setAccountInfo(data);
  //     console.log('form data đây', formData);
  //   } 
  //   catch (error) {
  //     console.error('Could not fetch products:', error);
  //   }
  // };

  // const [formData, setAccountInfo] = useState([]);
  const [customerID, setCustomerID] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setCustomerID(decodedToken.id); // Giả sử 'id' trong token là customerID
    } else {
      console.log("Không tìm thấy token")
    }
  }, []);

  useEffect(() => {
    if (customerID) {
      fetchMenuItems(customerID);
    }
  }, [customerID]);

  
  const fetchMenuItems = async (customerID) => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/user/change-information/${customerID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('dữ liệu user:', data);
      console.log('ID đây:', customerID);
      setFormData(data);
      // const split_res = splitDOB(data.date_of_birth);
      // formData.dob_day=split_res.day;
      // console.log('leierue',formData.dob_day);
      console.log('form data đây', data.date_of_birth); // Sửa lại để in dữ liệu mới nhất
    } catch (error) {
      console.error('Could not fetch products:', error);
    }
  };
  
  // const splitDOB = (x) =>{
  //   return x.map(dateString => {
  //     const [year, month, day] = x.split('-');
  //     return { year, month, day };
  //   });
  // };
  
  // useEffect(() => {
  //   if (customerID) {
  //     fetchMenuItems(customerID);
  //   }
  // }, [customerID]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave =() => {

  }

  // const [values,setValues] = useState({
  //   id: customerID,
  //   account_name: '',
  //   email: ''
  // })
  // useEffect(()=> {
  //   axios.get('http://localhost:3001/api/v1/user/change-information/'+customerID)
  //   .then(res=>{
  //      setValues({...values, account_name: res.data.account_name, email: res.data.email})
  //     //console.log(res);
  //   })
  //   .catch(err=>console.log(err))
  // },[])

  return (
    <div className="container">
        <div className="row">
          <div className="col-3">
            
          </div>
          <div className="col-6">
            <div className="profile_top">
              <h1>Hồ sơ của tôi</h1>
              <h3>Quản lý thông tin hồ sơ để bảo mật tài khoản</h3>

            </div>
            <div className="profile_body">
              <div className="profile_info_content">
                <div className="left_content">
                  Tên đăng nhập
                </div>
                <div className="right_content">
                  <input name="account_name" type="text" value={formData.account_name}></input>
                </div>
              </div>

              <div className="profile_info_content">
                <div className="left_content">
                  Họ và tên
                </div>
                <div className="right_content">
                  <input  name="name" type="text" value={formData.name} onChange={handleChange} required/>
                </div>
              </div>

              <div className="profile_info_content">
                <div className="left_content">
                  Email
                </div>
                <div className="right_content">
                  <input name="email" type="text" value={formData.email} onChange={handleChange} required/>
                </div>
              </div>

              <div className="profile_info_content">
                <div className="left_content">
                  Căn cước công dân
                </div>
                <div className="right_content">
                  <input name="CCCD" type="text" value={formData.CCCD} onChange={handleChange} required/>
                </div>
              </div>
{/* 
              <div className="profile_info_content">
                <div className="left_content">
                  Giới tính
                </div>
                <div className="right_content">
                <select value={formData.gender} >  
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
                </div>
              </div> */}

              {/* <div className="profile_info_content">
                <div className="left_content dob">
                  Ngày sinh
                </div>
                <div className="right_content">
                  <select name="dob_day" value={formData.dob_day} onChange={handleChange} required>
                    <option value="01">1</option>
                    <option value="02">2</option>
                    <option value="03">3</option>
                    <option value="04">4</option>
                    <option value="05">5</option>
                    <option value="06">6</option>
                    <option value="07">7</option>
                    <option value="08">8</option>
                    <option value="09">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                  </select>
                  <br/>
                  <select name="dob_month" value={formData.dob_month} onChange={handleChange} required >
                    <option value="01">Tháng 1</option>
                    <option value="02">Tháng 2</option>
                    <option value="03">Tháng 3</option>
                    <option value="04">Tháng 4</option>
                    <option value="05">Tháng 5</option>
                    <option value="06">Tháng 6</option>
                    <option value="07">Tháng 7</option>
                    <option value="08">Tháng 8</option>
                    <option value="09">Tháng 9</option>
                    <option value="10">Tháng 10</option>
                    <option value="11">Tháng 11</option>
                    <option value="12">Tháng 12</option>
                  </select>
                  <br/>
                  <select name="dob_year" value={formData.dob_year} onChange={handleChange} required>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                    <option value="2011">2011</option>
                    <option value="2010">2010</option>
                    <option value="2009">2009</option>
                    <option value="2008">2008</option>
                    <option value="2007">2007</option>
                    <option value="2006">2006</option>
                    <option value="2005">2005</option>
                    <option value="2004">2004</option>
                    <option value="2003">2003</option>
                    <option value="2002">2002</option>
                    <option value="2001">2001</option>
                    <option value="2000">2000</option>
                    <option value="1999">1999</option>
                    <option value="1998">1998</option>
                    <option value="1997">1997</option>
                    <option value="1996">1996</option>
                    <option value="1995">1995</option>
                    <option value="1994">1994</option>
                    <option value="1993">1993</option>
                    <option value="1992">1992</option>
                    <option value="1991">1991</option>
                    <option value="1990">1990</option>
                    <option value="1989">1989</option>
                    <option value="1988">1988</option>
                    <option value="1987">1987</option>
                    <option value="1986">1986</option>
                    <option value="1985">1985</option>
                    <option value="1984">1984</option>
                    <option value="1983">1983</option>
                    <option value="1982">1982</option>
                    <option value="1981">1981</option>
                    <option value="1980">1980</option>
                    <option value="1979">1979</option>
                    <option value="1978">1978</option>
                    <option value="1977">1977</option>
                    <option value="1976">1976</option>
                    <option value="1975">1975</option>
                    <option value="1974">1974</option>
                    <option value="1973">1973</option>
                    <option value="1972">1972</option>
                    <option value="1971">1971</option>
                    <option value="1970">1970</option>
                  </select>
                </div>
              </div> */}
              <div className="profile_info_content">
                <div className="btn">
                  <button type="submit" onClick={saveUserInfo}>Lưu</button>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default memo(ChangeInfoPage);