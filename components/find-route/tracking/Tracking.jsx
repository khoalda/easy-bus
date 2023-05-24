import React, { useState, useEffect, useRef } from "react";
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View, Text, Platform } from "react-native";

import * as Location from "expo-location";
import { COLORS } from "../../../constants";
import styles from "./Tracking.style";

const Tracking = () => {
  const mapRef = React.useRef(null);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [pin, setPin] = React.useState({
    latitude: 10.762622,
    longitude: 106.660172,
  });

  points = [
    {
      Name: "[BX33] ĐH BÁCH KHOA TP HCM",
      Lat: 10.774031,
      Lng: 106.661346,
      Type: 0,
    },
    {
      Name: "[Q10 055] Đại học Bách Khoa",
      Lat: 10.772603,
      Lng: 106.657698,
      Type: 1,
    },
    {
      Name: "[Q10 056] Bưu Điện Phú Thọ",
      Lat: 10.776487,
      Lng: 106.656625,
      Type: 1,
    },
    {
      Name: "[QTB 023] Ngã ba Thành Thái",
      Lat: 10.7788,
      Lng: 106.655912,
      Type: 1,
    },
    {
      Name: "[QTB 024] Siêu thị Nguyễn Kim - CMC Tân Bình",
      Lat: 10.781072,
      Lng: 106.65529,
      Type: 1,
    },
    {
      Name: "[QTB 025] Cây xăng Đôi",
      Lat: 10.784002,
      Lng: 106.654431,
      Type: 1,
    },
    {
      Name: "[QTB 026] Chợ Tân Bình",
      Lat: 10.786222,
      Lng: 106.653786,
      Type: 1,
    },
    {
      Name: "[QTB 027] Bệnh viện chỉnh hình và Phục hồi chức năng",
      Lat: 10.788689,
      Lng: 106.653076,
      Type: 1,
    },
    {
      Name: "[QTB 028] Bệnh viện Thống Nhất",
      Lat: 10.792101,
      Lng: 106.653074,
      Type: 1,
    },
    {
      Name: "[QTB 034] Bệnh viện Quận Tân Bình",
      Lat: 10.79472,
      Lng: 106.655198,
      Type: 1,
    },
    {
      Name: "[QTB 035] Nhà hàng Đông Phương",
      Lat: 10.798556,
      Lng: 106.659216,
      Type: 1,
    },
    {
      Name: "[QTB 036] Công viên Hoàng Văn Thụ",
      Lat: 10.800469,
      Lng: 106.663578,
      Type: 1,
    },
    {
      Name: "[QTB 037] Bảo Tàng Miền Đông",
      Lat: 10.800237,
      Lng: 106.666372,
      Type: 1,
    },
    {
      Name: "[QPN 006] Siêu Thị Big C",
      Lat: 10.799942,
      Lng: 106.669462,
      Type: 1,
    },
    {
      Name: "[QPN 007] Khách Sạn Tân Sơn Nhất",
      Lat: 10.799805,
      Lng: 106.670873,
      Type: 1,
    },
    {
      Name: "[QPN 008] Công an Phú Nhuận",
      Lat: 10.799542,
      Lng: 106.673818,
      Type: 1,
    },
    {
      Name: "[QPN 009] Ngã tư Phú Nhuận",
      Lat: 10.799088,
      Lng: 106.679354,
      Type: 1,
    },
    {
      Name: "[QPN 015 ] Ngã tư Phan Xích Long",
      Lat: 10.800416,
      Lng: 106.681741,
      Type: 1,
    },
    {
      Name: "[QPN 016] Ngã Tư Thích Quảng Đức",
      Lat: 10.802682,
      Lng: 106.684075,
      Type: 1,
    },
    {
      Name: "[QPN 017] Trường Đại học Văn Hiến",
      Lat: 10.803847,
      Lng: 106.686108,
      Type: 1,
    },
    {
      Name: "[QPN 018] Bệnh Viện Phước An",
      Lat: 10.803615,
      Lng: 106.687916,
      Type: 1,
    },
    {
      Name: "[QPN 060] Công viên Văn hóa Phú Nhuận",
      Lat: 10.803251,
      Lng: 106.690384,
      Type: 1,
    },
    {
      Name: "[QBTHT056] UBND Quận Bình Thạnh",
      Lat: 10.802666,
      Lng: 106.695153,
      Type: 1,
    },
    {
      Name: "[QBTH 114] Lăng Ông Bà Chiểu",
      Lat: 10.802408,
      Lng: 106.697159,
      Type: 1,
    },
    {
      Name: "[QBTH 006] Chợ Bà Chiểu",
      Lat: 10.802893,
      Lng: 106.699471,
      Type: 1,
    },
    {
      Name: "[QBTH 007] Tòa Án nhân dân Quận Bình Thạnh",
      Lat: 10.803615,
      Lng: 106.701204,
      Type: 1,
    },
    {
      Name: "[QBTH 008] Chùa Bồ Đề",
      Lat: 10.803293,
      Lng: 106.703988,
      Type: 1,
    },
    {
      Name: "[QBTH 009] Nhà thờ Hàng Xanh",
      Lat: 10.803077,
      Lng: 106.706713,
      Type: 1,
    },
    {
      Name: "[QBTH 010] Chợ Hàng Xanh",
      Lat: 10.802793,
      Lng: 106.710511,
      Type: 1,
    },
    {
      Name: "[QBTH 123] Ngã Ba Hàng Xanh",
      Lat: 10.803262,
      Lng: 106.711509,
      Type: 1,
    },
    {
      Name: "[QBTH 122] Đài Liệt sĩ",
      Lat: 10.808831,
      Lng: 106.711965,
      Type: 1,
    },
    {
      Name: "[QBTH 135] Siêu thị Coop Mart",
      Lat: 10.810791,
      Lng: 106.71241,
      Type: 1,
    },
    {
      Name: "[QBTH 136] Cổng ra - Bến xe Miền Đông 3",
      Lat: 10.811666,
      Lng: 106.712532,
      Type: 1,
    },
    {
      Name: "[QTD 118] Ngã tư Bình Triệu",
      Lat: 10.82603,
      Lng: 106.715655,
      Type: 1,
    },
    {
      Name: "[QTD 119] Đường số 20",
      Lat: 10.827878,
      Lng: 106.721032,
      Type: 1,
    },
    {
      Name: "[QTD 120] Chùa Ưu Đàm",
      Lat: 10.830679,
      Lng: 106.72476,
      Type: 1,
    },
    {
      Name: "[QTD 121] Cá sấu Hoa cà",
      Lat: 10.833606,
      Lng: 106.728331,
      Type: 1,
    },
    {
      Name: "[QTD 122] THCS Ngô Chí Quốc",
      Lat: 10.83555,
      Lng: 106.730713,
      Type: 1,
    },
    {
      Name: "[QTD 123] Chùa An Lạc",
      Lat: 10.837484,
      Lng: 106.733288,
      Type: 1,
    },
    {
      Name: "[QTD 124] Cầu Gò Dưa",
      Lat: 10.839776,
      Lng: 106.740509,
      Type: 1,
    },
    {
      Name: "[QTD 125] Đường 30",
      Lat: 10.841821,
      Lng: 106.744822,
      Type: 1,
    },
    {
      Name: "[QTĐT0010] Chùa Quan  m",
      Lat: 10.847447,
      Lng: 106.748008,
      Type: 1,
    },
    {
      Name: "[QTĐT0011] Ngã tư Tô Ngọc Vân - Phạm Văn Đồng",
      Lat: 10.851599,
      Lng: 106.750422,
      Type: 1,
    },
    {
      Name: "[QTD 051] Bồn nước",
      Lat: 10.852854,
      Lng: 106.752037,
      Type: 1,
    },
    {
      Name: "[QTD 052] Chợ Thủ Đức",
      Lat: 10.851198,
      Lng: 106.75428,
      Type: 1,
    },
    {
      Name: "[QTD 070] Ngã ba Chương Dương",
      Lat: 10.850419,
      Lng: 106.760931,
      Type: 1,
    },
    {
      Name: "[QTD 071] Cao đẳng xây dựng 2",
      Lat: 10.85065,
      Lng: 106.764439,
      Type: 1,
    },
    {
      Name: "[QTD 072] Siêu thị Nguyễn Kim",
      Lat: 10.849686,
      Lng: 106.769112,
      Type: 1,
    },
    {
      Name: "[QTD 073] Trường ĐHSP Kỹ Thuật",
      Lat: 10.849597,
      Lng: 106.771917,
      Type: 1,
    },
    {
      Name: "[Q9 218] Công an Quận 9",
      Lat: 10.849966,
      Lng: 106.775066,
      Type: 1,
    },
    {
      Name: "[Q9 219] Chợ chiều",
      Lat: 10.853511,
      Lng: 106.780474,
      Type: 1,
    },
    {
      Name: "[Q9 281] Trạm Hutech - Khu Công nghệ cao",
      Lat: 10.856398,
      Lng: 106.785382,
      Type: 1,
    },
    {
      Name: "[Q9 220] Khu Công nghệ cao quận 9",
      Lat: 10.858511,
      Lng: 106.788869,
      Type: 1,
    },
    {
      Name: "[Q9 221] Cầu Vượt Trạm 2",
      Lat: 10.863595,
      Lng: 106.797538,
      Type: 1,
    },
    {
      Name: "[Q9 223] Suối Tiên",
      Lat: 10.866113,
      Lng: 106.802081,
      Type: 1,
    },
    {
      Name: "[Q9 225] Nghĩa trang liệt sĩ TP.HCM",
      Lat: 10.873515,
      Lng: 106.809458,
      Type: 1,
    },
    {
      Name: "[QTD 251] Vành đại ĐHQG TPHCM",
      Lat: 10.874405,
      Lng: 106.806995,
      Type: 1,
    },
    {
      Name: "[QTD 253] KTX Khu A ĐH Quốc Gia TPHCM",
      Lat: 10.875886,
      Lng: 106.804968,
      Type: 1,
    },
    {
      Name: "[QTD 256] KTX Khu A ĐHQG",
      Lat: 10.877729,
      Lng: 106.805858,
      Type: -2,
    },
  ];

  const [region, setRegion] = useState({
    latitude: 10.762622,
    longitude: 106.660172,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      if (mapRef.current) {
        mapRef.current.animateToRegion(region, 100); // 100 là thời gian (ms) để di chuyển đến vùng
      }
      console.log(location);
      console.log(region);
    })();
  }, []);

  return (
    <View style={styles.mapContainer}>
      <MapView
        ref={mapRef}
        style={styles.mapContainer}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
      >
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
        ></Marker>

        {points.map((point, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: point.Lat,
              longitude: point.Lng,
            }}
          />
        ))}
      </MapView>
    </View>
  );
};

export default Tracking;
