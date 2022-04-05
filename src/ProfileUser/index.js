import { useState, useEffect } from "react";
import { Col, Container, Form, Card, Button } from "react-bootstrap";

const provinsi = {
  provinsi: [
    {
      province_id: "1",
      province: "Bali",
    },
    {
      province_id: "2",
      province: "Bangka Belitung",
    },
    {
      province_id: "3",
      province: "Banten",
    },
    {
      province_id: "4",
      province: "Bengkulu",
    },
    {
      province_id: "5",
      province: "DI Yogyakarta",
    },
    {
      province_id: "6",
      province: "DKI Jakarta",
    },
    {
      province_id: "7",
      province: "Gorontalo",
    },
    {
      province_id: "8",
      province: "Jambi",
    },
    {
      province_id: "9",
      province: "Jawa Barat",
    },
    {
      province_id: "10",
      province: "Jawa Tengah",
    },
    {
      province_id: "11",
      province: "Jawa Timur",
    },
    {
      province_id: "12",
      province: "Kalimantan Barat",
    },
    {
      province_id: "13",
      province: "Kalimantan Selatan",
    },
    {
      province_id: "14",
      province: "Kalimantan Tengah",
    },
    {
      province_id: "15",
      province: "Kalimantan Timur",
    },
    {
      province_id: "16",
      province: "Kalimantan Utara",
    },
    {
      province_id: "17",
      province: "Kepulauan Riau",
    },
    {
      province_id: "18",
      province: "Lampung",
    },
    {
      province_id: "19",
      province: "Maluku",
    },
    {
      province_id: "20",
      province: "Maluku Utara",
    },
    {
      province_id: "21",
      province: "Nanggroe Aceh Darussalam (NAD)",
    },
    {
      province_id: "22",
      province: "Nusa Tenggara Barat (NTB)",
    },
    {
      province_id: "23",
      province: "Nusa Tenggara Timur (NTT)",
    },
    {
      province_id: "24",
      province: "Papua",
    },
    {
      province_id: "25",
      province: "Papua Barat",
    },
    {
      province_id: "26",
      province: "Riau",
    },
    {
      province_id: "27",
      province: "Sulawesi Barat",
    },
    {
      province_id: "28",
      province: "Sulawesi Selatan",
    },
    {
      province_id: "29",
      province: "Sulawesi Tengah",
    },
    {
      province_id: "30",
      province: "Sulawesi Tenggara",
    },
    {
      province_id: "31",
      province: "Sulawesi Utara",
    },
    {
      province_id: "32",
      province: "Sumatera Barat",
    },
    {
      province_id: "33",
      province: "Sumatera Selatan",
    },
    {
      province_id: "34",
      province: "Sumatera Utara",
    },
  ],
};

const ProfileUser = () => {
  const [cek, setCek] = useState("");
  const [dataKota, setDataKota] = useState([]);
  const [kabkota, setKabKota] = useState("");
  const [ongkir , setOngkir] = useState([]);

  const handleChange = (e) => {
    setCek(e.target.value);
  };

  const handleChangeKota = (e) => {
    setKabKota(e.target.value)
  }

  const getDataKota = async () => {
    const hasil = provinsi.provinsi.filter((item) => item["province"] === cek);
    if (hasil[0]?.province_id) {
      const dataSend = { id_prov: hasil[0]?.province_id };
      const getDataKota1 = await fetch(`https://apiongkir.herokuapp.com/api/kota`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataSend),
      });

      const hasilDataKota1 = await getDataKota1.json();
      setDataKota(hasilDataKota1);
    }
  };

  useEffect(() => {
    getDataKota();
  }, [cek]);

  const getOngkir = async () => {
    const hasil = dataKota.filter((item) => item.city_name === kabkota);
    if(hasil[0]?.city_id){
      const dataSend = {
        destination: `${hasil[0].city_id}`,
        // weight: parseInt(localStorage.getItem('berat')),
        weight: 1700,
      };
      const getDataKota1 = await fetch(`https://apiongkir.herokuapp.com/api/ongkir`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataSend),
      });
  
      const hasilDataKota1 = await getDataKota1.json();
      setOngkir(hasilDataKota1)
    }
  };

  useEffect(() => {
    getOngkir()
  }, [kabkota]);

  return (
    <>
      <h1>Profile User</h1>

      <Form.Group className="mb-3">
        <Form.Label>Provinsi</Form.Label>
        <Form.Select onChange={(e) => handleChange(e)}>
          <option value="">Pilih Provinsi</option>
          {provinsi.provinsi.map((prov, index) => {
            return (
              <option key={index} value={prov.province}>
                {prov.province}
              </option>
            );
          })}
        </Form.Select>
      </Form.Group>

      {
        dataKota.length > 0?
        <Form.Group className="mb-3">
        <Form.Label>Kota</Form.Label>
        <Form.Select onChange={(e) => handleChangeKota(e)}>
          <option value="">Pilih Kota</option>
          {dataKota.map((kab, index) => {
            return (
              <option key={index} value={kab.city_name}>
                {kab.city_name}
              </option>
            );
          })}
        </Form.Select>
      </Form.Group>:''
      }

      <h3>Hasil Ongkir</h3>
      <p className="text-danger">tinggal pilih salah satu mau pake yang mana</p>

      {

       ongkir?.rajaongkir?.results[0]?.costs.map((d , i) => {
         return(
           <div key={i}>
              <p>ongkir : {d?.cost[0].value} dan estimasi {d?.cost[0].etd} dan {d.service}</p>
           </div>
         )
       })
       
      }
    </>
  );
};
export default ProfileUser;
