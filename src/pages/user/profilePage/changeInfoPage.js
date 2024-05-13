import { memo, useState } from "react";
import "./style.css";
import axios from "axios";

const ChangeInfoPage = () => {
  const [formData, setFormData] = useState({
    account_name: "",
    email: "",
    cccd: "",
    phone_number: "",
    gender: "man", // Giới tính mặc định là "Nam"
    dob_day: "1", // Ngày sinh mặc định là ngày 1
    dob_month: "jan", // Tháng sinh mặc định là tháng 1
    dob_year: "2013" // Năm sinh mặc định là năm 2013
  });

  const saveUserInfo = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/v1/user/change-information', {
        account_name: formData.account_name,
        email: formData.email,
        cccd: formData.cccd,
        phone_number: formData.phone_number,
        gender: formData.gender,
        dob_day: formData.dob_day,
        dob_month: formData.dob_month,
        dob_year: formData.dob_year
      });
  
      console.log(response.data); // Xử lý kết quả trả về từ server tại đây
    } 
    catch (error) {
      console.error('Error:', error);
    }
  }; 

  return (
    <>                 
      <div className="container">
        <div className="row">
          <div className="col-3">
            trai
          </div>
          <div className="col-9">
            <div className="profile_top">
              <h1>Hồ sơ của tôi</h1>
              <h3>Quản lý thông tin hồ sơ để bảo mật tài khoản</h3>
            </div>
            <div className="profile_body row">
              <div className="profile_body_info col-9">
              <form>
                  <table>
                    <tr>
                      <td>
                        <label className="form_info">Tên đăng nhập</label>
                      </td>
                      <td>
                        <label className="account_name" type="text" value={formData.account_name} >richchoik</label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="form_info">Email</label>
                      </td>
                      <td>
                        <input
                          className="email"
                          type="text"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="form_info">CCCD</label>
                      </td>
                      <td>
                        <input 
                          className="cccd" 
                          type="text" 
                          value={formData.cccd} 
                          onChange={(e) => setFormData({ ...formData, cccd: e.target.value })}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="form_info">Số điện thoại</label>
                      </td>
                      <td>
                        <input 
                          className="phone_number" 
                          type="text" 
                          value={formData.phone_number} 
                          onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="form_info">Giới tính</label>
                      </td>
                      <td>
                        <select className="gender" value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
                          <option value="man">Nam</option>
                          <option value="woman">Nữ</option>
                          <option value="other">Khác</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="form_info">Ngày sinh</label>
                      </td>
                      <td>
                        <select className="dob_day" value={formData.dob_day} onChange={(e) => setFormData({ ...formData, dob_day: e.target.value })}>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
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
                        <select className="dob_month" value={formData.dob_month} onChange={(e) => setFormData({ ...formData, dob_month: e.target.value })}>
                          <option value="jan">Tháng 1</option>
                          <option value="feb">Tháng 2</option>
                          <option value="mar">Tháng 3</option>
                          <option value="apr">Tháng 4</option>
                          <option value="may">Tháng 5</option>
                          <option value="jun">Tháng 6</option>
                          <option value="jul">Tháng 7</option>
                          <option value="aug">Tháng 8</option>
                          <option value="sep">Tháng 9</option>
                          <option value="oct">Tháng 10</option>
                          <option value="nov">Tháng 11</option>
                          <option value="dec">Tháng 12</option>
                        </select>
                        <select className="dob_year" value={formData.dob_year} onChange={(e) => setFormData({ ...formData, dob_year: e.target.value })}>
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
                      </td>
                    </tr>
                  </table>
                  <input type="button" className="sub-btn" value="Lưu" onClick={saveUserInfo}/>
                </form>
              </div>
              <div className="profile_body_img col-3">
                ảnh
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default memo(ChangeInfoPage);