import React, { useState, useEffect, useRef } from "react";
import MapView, { Marker, Circle, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
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

    const points = [
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

    const path = [{ Latitude: 10.774031, Longitude: 106.661346 }, { Latitude: 10.774031, Longitude: 106.661346 }, { Latitude: 10.77403069, Longitude: 106.66134644 }, { Latitude: 10.77383137, Longitude: 106.66155243 }, { Latitude: 10.77328777, Longitude: 106.6611557 }, { Latitude: 10.7733240127563, Longitude: 106.661125183105 }, { Latitude: 10.7733240127563, Longitude: 106.661125183105 }, { Latitude: 10.77332211, Longitude: 106.66112518 }, { Latitude: 10.7732935, Longitude: 106.66116333 }, { Latitude: 10.772645, Longitude: 106.66065216 }, { Latitude: 10.77230835, Longitude: 106.66030884 }, { Latitude: 10.77176762, Longitude: 106.65971375 }, { Latitude: 10.77122784, Longitude: 106.65911865 }, { Latitude: 10.7712259292603, Longitude: 106.659118652344 }, { Latitude: 10.7712259292603, Longitude: 106.659118652344 }, { Latitude: 10.770813945, Longitude: 106.65865326 }, { Latitude: 10.77040005, Longitude: 106.65818787 }, { Latitude: 10.7711184833333, Longitude: 106.657992046667 }, { Latitude: 10.7718369166667, Longitude: 106.657796223333 }, { Latitude: 10.77255535, Longitude: 106.6576004 }, { Latitude: 10.77260303, Longitude: 106.65769958 }, { Latitude: 10.7726030349731, Longitude: 106.657699584961 }, { Latitude: 10.7726030349731, Longitude: 106.657699584961 }, { Latitude: 10.77255058, Longitude: 106.65757751 }, { Latitude: 10.773334692, Longitude: 106.657357784 }, { Latitude: 10.774118804, Longitude: 106.657138058 }, { Latitude: 10.774902916, Longitude: 106.656918332 }, { Latitude: 10.775687028, Longitude: 106.656698606 }, { Latitude: 10.77647114, Longitude: 106.65647888 }, { Latitude: 10.77648735, Longitude: 106.65662384 }, { Latitude: 10.7764863967896, Longitude: 106.656623840332 }, { Latitude: 10.7764863967896, Longitude: 106.656623840332 }, { Latitude: 10.77643967, Longitude: 106.65649414 }, { Latitude: 10.7772194566667, Longitude: 106.656277973333 }, { Latitude: 10.7779992433333, Longitude: 106.656061806667 }, { Latitude: 10.77877903, Longitude: 106.65584564 }, { Latitude: 10.7787990570068, Longitude: 106.655914306641 }, { Latitude: 10.7787990570068, Longitude: 106.655914306641 }, { Latitude: 10.77880001, Longitude: 106.65591431 }, { Latitude: 10.77875805, Longitude: 106.65583038 }, { Latitude: 10.77952385, Longitude: 106.655614213333 }, { Latitude: 10.78028965, Longitude: 106.655398046667 }, { Latitude: 10.78105545, Longitude: 106.65518188 }, { Latitude: 10.78107166, Longitude: 106.6552887 }, { Latitude: 10.7810735702515, Longitude: 106.655288696289 }, { Latitude: 10.7810735702515, Longitude: 106.655288696289 }, { Latitude: 10.78102398, Longitude: 106.65518188 }, { Latitude: 10.7817645075, Longitude: 106.65497398 }, { Latitude: 10.782505035, Longitude: 106.65476608 }, { Latitude: 10.7832455625, Longitude: 106.65455818 }, { Latitude: 10.78398609, Longitude: 106.65435028 }, { Latitude: 10.7840023040771, Longitude: 106.654434204102 }, { Latitude: 10.7840023040771, Longitude: 106.654434204102 }, { Latitude: 10.7840023, Longitude: 106.6544342 }, { Latitude: 10.78398037, Longitude: 106.65434265 }, { Latitude: 10.7847197866667, Longitude: 106.65413157 }, { Latitude: 10.7854592033333, Longitude: 106.65392049 }, { Latitude: 10.78619862, Longitude: 106.65370941 }, { Latitude: 10.78622246, Longitude: 106.65378571 }, { Latitude: 10.7862195968628, Longitude: 106.653778076172 }, { Latitude: 10.7862195968628, Longitude: 106.653778076172 }, { Latitude: 10.78619862, Longitude: 106.65370941 }, { Latitude: 10.78702609, Longitude: 106.653477986667 }, { Latitude: 10.78785356, Longitude: 106.653246563333 }, { Latitude: 10.78868103, Longitude: 106.65301514 }, { Latitude: 10.788688659668, Longitude: 106.653076171875 }, { Latitude: 10.788688659668, Longitude: 106.653076171875 }, { Latitude: 10.78868866, Longitude: 106.65307617 }, { Latitude: 10.78866005, Longitude: 106.65300751 }, { Latitude: 10.78941345, Longitude: 106.65279007 }, { Latitude: 10.79016685, Longitude: 106.65257263 }, { Latitude: 10.79058838, Longitude: 106.65253448 }, { Latitude: 10.7913208, Longitude: 106.65262604 }, { Latitude: 10.7921381, Longitude: 106.65300751 }, { Latitude: 10.79210091, Longitude: 106.65307617 }, { Latitude: 10.7921009063721, Longitude: 106.653076171875 }, { Latitude: 10.7921009063721, Longitude: 106.653076171875 }, { Latitude: 10.79212189, Longitude: 106.65300751 }, { Latitude: 10.79285431, Longitude: 106.65341187 }, { Latitude: 10.79353428, Longitude: 106.6539917 }, { Latitude: 10.79410839, Longitude: 106.65444946 }, { Latitude: 10.794435025, Longitude: 106.654792785 }, { Latitude: 10.79476166, Longitude: 106.65513611 }, { Latitude: 10.7947197, Longitude: 106.65519714 }, { Latitude: 10.7947187423706, Longitude: 106.655197143555 }, { Latitude: 10.7947187423706, Longitude: 106.655197143555 }, { Latitude: 10.7947731, Longitude: 106.65514374 }, { Latitude: 10.7953240514286, Longitude: 106.655712674286 }, { Latitude: 10.7958750028571, Longitude: 106.656281608571 }, { Latitude: 10.7964259542857, Longitude: 106.656850542857 }, { Latitude: 10.7969769057143, Longitude: 106.657419477143 }, { Latitude: 10.7975278571429, Longitude: 106.657988411429 }, { Latitude: 10.7980788085714, Longitude: 106.658557345714 }, { Latitude: 10.79862976, Longitude: 106.65912628 }, { Latitude: 10.79855633, Longitude: 106.65921783 }, { Latitude: 10.7985572814941, Longitude: 106.659217834473 }, { Latitude: 10.7985572814941, Longitude: 106.659217834473 }, { Latitude: 10.7986145, Longitude: 106.65913391 }, { Latitude: 10.7991412466667, Longitude: 106.659690856667 }, { Latitude: 10.7996679933333, Longitude: 106.660247803333 }, { Latitude: 10.80019474, Longitude: 106.66080475 }, { Latitude: 10.8002367, Longitude: 106.66104889 }, { Latitude: 10.80048466, Longitude: 106.66131592 }, { Latitude: 10.80064774, Longitude: 106.66169739 }, { Latitude: 10.80064774, Longitude: 106.66259766 }, { Latitude: 10.800616265, Longitude: 106.663089755 }, { Latitude: 10.80058479, Longitude: 106.66358185 }, { Latitude: 10.8004760742188, Longitude: 106.66357421875 }, { Latitude: 10.8004760742188, Longitude: 106.66357421875 }, { Latitude: 10.8004694, Longitude: 106.66357422 }, { Latitude: 10.80056381, Longitude: 106.66355896 }, { Latitude: 10.80050039, Longitude: 106.664375305 }, { Latitude: 10.80043697, Longitude: 106.66519165 }, { Latitude: 10.80037403, Longitude: 106.66600418 }, { Latitude: 10.80031109, Longitude: 106.66681671 }, { Latitude: 10.80037403, Longitude: 106.66697693 }, { Latitude: 10.80051136, Longitude: 106.66700745 }, { Latitude: 10.80081654, Longitude: 106.66674042 }, { Latitude: 10.80107975, Longitude: 106.66625977 }, { Latitude: 10.80133343, Longitude: 106.66596222 }, { Latitude: 10.80167007, Longitude: 106.66571045 }, { Latitude: 10.80188656, Longitude: 106.66571808 }, { Latitude: 10.80208683, Longitude: 106.6657486 }, { Latitude: 10.80245018, Longitude: 106.66585541 }, { Latitude: 10.80243969, Longitude: 106.66592407 }, { Latitude: 10.8024387359619, Longitude: 106.665924072266 }, { Latitude: 10.8024387359619, Longitude: 106.665924072266 }, { Latitude: 10.8024559, Longitude: 106.66586304 }, { Latitude: 10.803209305, Longitude: 106.66605759 }, { Latitude: 10.80396271, Longitude: 106.66625214 }, { Latitude: 10.80469513, Longitude: 106.666454315 }, { Latitude: 10.80542755, Longitude: 106.66665649 }, { Latitude: 10.8054180145264, Longitude: 106.666702270508 }, { Latitude: 10.8054180145264, Longitude: 106.666702270508 }, { Latitude: 10.80541706, Longitude: 106.66670227 }, { Latitude: 10.80543804, Longitude: 106.66664886 }, { Latitude: 10.80609131, Longitude: 106.66680908 }, { Latitude: 10.80599928, Longitude: 106.667510985 }, { Latitude: 10.80590725, Longitude: 106.66821289 }, { Latitude: 10.806557655, Longitude: 106.668331145 }, { Latitude: 10.80720806, Longitude: 106.6684494 }, { Latitude: 10.8072214126587, Longitude: 106.668495178223 }, { Latitude: 10.8072214126587, Longitude: 106.668495178223 }, { Latitude: 10.80722141, Longitude: 106.66849518 }, { Latitude: 10.80724049, Longitude: 106.6684494 }, { Latitude: 10.80800438, Longitude: 106.66857147 }, { Latitude: 10.80876827, Longitude: 106.66869354 }, { Latitude: 10.80873537, Longitude: 106.669387815 }, { Latitude: 10.80870247, Longitude: 106.67008209 }, { Latitude: 10.80866957, Longitude: 106.670776365 }, { Latitude: 10.80863667, Longitude: 106.67147064 }, { Latitude: 10.808568, Longitude: 106.67173004 }, { Latitude: 10.8082571, Longitude: 106.67227173 }, { Latitude: 10.8082046508789, Longitude: 106.672233581543 }, { Latitude: 10.8082046508789, Longitude: 106.672233581543 }, { Latitude: 10.8082037, Longitude: 106.67223358 }, { Latitude: 10.80825138, Longitude: 106.67225647 }, { Latitude: 10.80799866, Longitude: 106.67268372 }, { Latitude: 10.80800915, Longitude: 106.67311859 }, { Latitude: 10.8081255, Longitude: 106.67338562 }, { Latitude: 10.80836201, Longitude: 106.67362976 }, { Latitude: 10.8088242233333, Longitude: 106.674039203333 }, { Latitude: 10.8092864366667, Longitude: 106.674448646667 }, { Latitude: 10.80974865, Longitude: 106.67485809 }, { Latitude: 10.80972672, Longitude: 106.67492676 }, { Latitude: 10.8097276687622, Longitude: 106.674926757813 }, { Latitude: 10.8097276687622, Longitude: 106.674926757813 }, { Latitude: 10.80978012, Longitude: 106.67487335 }, { Latitude: 10.8103281666667, Longitude: 106.675354003333 }, { Latitude: 10.8108762133333, Longitude: 106.675834656667 }, { Latitude: 10.81142426, Longitude: 106.67631531 }, { Latitude: 10.8113813400269, Longitude: 106.676399230957 }, { Latitude: 10.8113813400269, Longitude: 106.676399230957 }, { Latitude: 10.81138229, Longitude: 106.67639923 }, { Latitude: 10.81144524, Longitude: 106.67634583 }, { Latitude: 10.81206163, Longitude: 106.676862083333 }, { Latitude: 10.81267802, Longitude: 106.677378336667 }, { Latitude: 10.81329441, Longitude: 106.67789459 }, { Latitude: 10.8132333755493, Longitude: 106.677947998047 }, { Latitude: 10.8132333755493, Longitude: 106.677947998047 }, { Latitude: 10.81323147, Longitude: 106.677948 }, { Latitude: 10.81328392, Longitude: 106.67788696 }, { Latitude: 10.81369972, Longitude: 106.67832184 }, { Latitude: 10.81353188, Longitude: 106.6785202 }, { Latitude: 10.81344223, Longitude: 106.67875671 }, { Latitude: 10.81352615, Longitude: 106.67897034 }, { Latitude: 10.81365299, Longitude: 106.67914581 }, { Latitude: 10.81386852, Longitude: 106.67922974 }, { Latitude: 10.81407928, Longitude: 106.67919159 }, { Latitude: 10.81439161, Longitude: 106.6798877725 }, { Latitude: 10.81470394, Longitude: 106.680583955 }, { Latitude: 10.81501627, Longitude: 106.6812801375 }, { Latitude: 10.8153286, Longitude: 106.68197632 }, { Latitude: 10.815741732, Longitude: 106.682678224 }, { Latitude: 10.816154864, Longitude: 106.683380128 }, { Latitude: 10.816567996, Longitude: 106.684082032 }, { Latitude: 10.816981128, Longitude: 106.684783936 }, { Latitude: 10.81739426, Longitude: 106.68548584 }, { Latitude: 10.8173952102661, Longitude: 106.685485839844 }, { Latitude: 10.8173952102661, Longitude: 106.685485839844 }, { Latitude: 10.817723275, Longitude: 106.68612671 }, { Latitude: 10.81805229, Longitude: 106.68676758 }, { Latitude: 10.81834459, Longitude: 106.687431335 }, { Latitude: 10.8186359405518, Longitude: 106.688095092773 }, { Latitude: 10.8186359405518, Longitude: 106.688095092773 }, { Latitude: 10.81863689, Longitude: 106.68809509 }, { Latitude: 10.81896877, Longitude: 106.6889267 }, { Latitude: 10.819150925, Longitude: 106.689395905 }, { Latitude: 10.81933308, Longitude: 106.68986511 }, { Latitude: 10.81932259, Longitude: 106.69010925 }, { Latitude: 10.81946945, Longitude: 106.69023132 }, { Latitude: 10.81960106, Longitude: 106.69077301 }, { Latitude: 10.81954384, Longitude: 106.6907959 }, { Latitude: 10.8195219039917, Longitude: 106.690803527832 }, { Latitude: 10.8195219039917, Longitude: 106.690803527832 }, { Latitude: 10.81961727, Longitude: 106.69078827 }, { Latitude: 10.8198035533333, Longitude: 106.691513063333 }, { Latitude: 10.8199898366667, Longitude: 106.692237856667 }, { Latitude: 10.82017612, Longitude: 106.69296265 }, { Latitude: 10.82030487, Longitude: 106.693470005 }, { Latitude: 10.82043362, Longitude: 106.69397736 }, { Latitude: 10.82051277, Longitude: 106.69425964 }, { Latitude: 10.8207082748413, Longitude: 106.695083618164 }, { Latitude: 10.8207082748413, Longitude: 106.695083618164 }, { Latitude: 10.82070827, Longitude: 106.69508362 }, { Latitude: 10.8209311133333, Longitude: 106.695899963333 }, { Latitude: 10.8211539566667, Longitude: 106.696716306667 }, { Latitude: 10.8213768, Longitude: 106.69753265 }, { Latitude: 10.8213405609131, Longitude: 106.697547912598 }, { Latitude: 10.8213405609131, Longitude: 106.697547912598 }, { Latitude: 10.82133007, Longitude: 106.69754791 }, { Latitude: 10.8213768, Longitude: 106.69753265 }, { Latitude: 10.821579935, Longitude: 106.69830322 }, { Latitude: 10.82178307, Longitude: 106.69907379 }, { Latitude: 10.82198048, Longitude: 106.69985199 }, { Latitude: 10.82217789, Longitude: 106.70063019 }, { Latitude: 10.8221778869629, Longitude: 106.700630187988 }, { Latitude: 10.8221778869629, Longitude: 106.700630187988 }, { Latitude: 10.82239652, Longitude: 106.7014694225 }, { Latitude: 10.82261515, Longitude: 106.702308655 }, { Latitude: 10.82283378, Longitude: 106.7031478875 }, { Latitude: 10.82305241, Longitude: 106.70398712 }, { Latitude: 10.8230543136597, Longitude: 106.703994750977 }, { Latitude: 10.8230543136597, Longitude: 106.703994750977 }, { Latitude: 10.8232737416667, Longitude: 106.704804100833 }, { Latitude: 10.8234950733333, Longitude: 106.705621081667 }, { Latitude: 10.823716405, Longitude: 106.7064380625 }, { Latitude: 10.8239377366667, Longitude: 106.707255043333 }, { Latitude: 10.8241590683333, Longitude: 106.708072024167 }, { Latitude: 10.8243804, Longitude: 106.708889005 }, { Latitude: 10.8246017316667, Longitude: 106.709705985833 }, { Latitude: 10.8248230633333, Longitude: 106.710522966667 }, { Latitude: 10.825044395, Longitude: 106.7113399475 }, { Latitude: 10.8252657266667, Longitude: 106.712156928333 }, { Latitude: 10.8254870583333, Longitude: 106.712973909167 }, { Latitude: 10.82570839, Longitude: 106.71379089 }, { Latitude: 10.82556629, Longitude: 106.71395111 }, { Latitude: 10.82548714, Longitude: 106.71424103 }, { Latitude: 10.8256712, Longitude: 106.7144928 }, { Latitude: 10.82589817, Longitude: 106.71455383 }, { Latitude: 10.82603264, Longitude: 106.715076445 }, { Latitude: 10.82616711, Longitude: 106.71559906 }, { Latitude: 10.82602978, Longitude: 106.71565247 }, { Latitude: 10.826042175293, Longitude: 106.715644836426 }, { Latitude: 10.826042175293, Longitude: 106.715644836426 }, { Latitude: 10.82620335, Longitude: 106.71561432 }, { Latitude: 10.826386455, Longitude: 106.71631241 }, { Latitude: 10.82656956, Longitude: 106.7170105 }, { Latitude: 10.826752665, Longitude: 106.71770859 }, { Latitude: 10.82693577, Longitude: 106.71840668 }, { Latitude: 10.8271122, Longitude: 106.718978885 }, { Latitude: 10.82728863, Longitude: 106.71955109 }, { Latitude: 10.82760239, Longitude: 106.72024918 }, { Latitude: 10.82791615, Longitude: 106.72094727 }, { Latitude: 10.827878, Longitude: 106.72103119 }, { Latitude: 10.827880859375, Longitude: 106.721031188965 }, { Latitude: 10.827880859375, Longitude: 106.721031188965 }, { Latitude: 10.82794189, Longitude: 106.72096252 }, { Latitude: 10.82830286, Longitude: 106.721523285 }, { Latitude: 10.82866383, Longitude: 106.72208405 }, { Latitude: 10.829172615, Longitude: 106.72275162 }, { Latitude: 10.8296814, Longitude: 106.72341919 }, { Latitude: 10.830200195, Longitude: 106.724063875 }, { Latitude: 10.83071899, Longitude: 106.72470856 }, { Latitude: 10.8306789398193, Longitude: 106.724761962891 }, { Latitude: 10.8306789398193, Longitude: 106.724761962891 }, { Latitude: 10.83067894, Longitude: 106.72476196 }, { Latitude: 10.83071327, Longitude: 106.72472382 }, { Latitude: 10.8311999633333, Longitude: 106.72531891 }, { Latitude: 10.8316866566667, Longitude: 106.725914 }, { Latitude: 10.83217335, Longitude: 106.72650909 }, { Latitude: 10.8326667166667, Longitude: 106.727099096667 }, { Latitude: 10.8331600833333, Longitude: 106.727689103333 }, { Latitude: 10.83365345, Longitude: 106.72827911 }, { Latitude: 10.83360577, Longitude: 106.72833252 }, { Latitude: 10.8336048126221, Longitude: 106.728332519531 }, { Latitude: 10.8336048126221, Longitude: 106.728332519531 }, { Latitude: 10.83365917, Longitude: 106.72826385 }, { Latitude: 10.834142445, Longitude: 106.728864665 }, { Latitude: 10.83462572, Longitude: 106.72946548 }, { Latitude: 10.835108995, Longitude: 106.730066295 }, { Latitude: 10.83559227, Longitude: 106.73066711 }, { Latitude: 10.83555031, Longitude: 106.73071289 }, { Latitude: 10.8355531692505, Longitude: 106.730712890625 }, { Latitude: 10.8355531692505, Longitude: 106.730712890625 }, { Latitude: 10.83557701, Longitude: 106.73067474 }, { Latitude: 10.8361142466667, Longitude: 106.73133087 }, { Latitude: 10.8366514833333, Longitude: 106.731987 }, { Latitude: 10.83718872, Longitude: 106.73264313 }, { Latitude: 10.83717823, Longitude: 106.73287964 }, { Latitude: 10.83738422, Longitude: 106.73296356 }, { Latitude: 10.8375473, Longitude: 106.73323059 }, { Latitude: 10.8374824523926, Longitude: 106.733291625977 }, { Latitude: 10.8374824523926, Longitude: 106.733291625977 }, { Latitude: 10.83748436, Longitude: 106.73329163 }, { Latitude: 10.83790016, Longitude: 106.73394775 }, { Latitude: 10.83822155, Longitude: 106.73464203 }, { Latitude: 10.83851147, Longitude: 106.73535156 }, { Latitude: 10.83874893, Longitude: 106.73600006 }, { Latitude: 10.83892822, Longitude: 106.73667145 }, { Latitude: 10.83904266, Longitude: 106.737148285 }, { Latitude: 10.8391571, Longitude: 106.73762512 }, { Latitude: 10.839271545, Longitude: 106.73810196 }, { Latitude: 10.83938599, Longitude: 106.7385788 }, { Latitude: 10.83950472, Longitude: 106.739048005 }, { Latitude: 10.83962345, Longitude: 106.73951721 }, { Latitude: 10.839741705, Longitude: 106.739990235 }, { Latitude: 10.83985996, Longitude: 106.74046326 }, { Latitude: 10.8397817611694, Longitude: 106.740501403809 }, { Latitude: 10.8397817611694, Longitude: 106.740501403809 }, { Latitude: 10.83977604, Longitude: 106.74050903 }, { Latitude: 10.83988094, Longitude: 106.74048615 }, { Latitude: 10.840031145, Longitude: 106.74108887 }, { Latitude: 10.84018135, Longitude: 106.74169159 }, { Latitude: 10.84033966, Longitude: 106.74223709 }, { Latitude: 10.84049797, Longitude: 106.74278259 }, { Latitude: 10.84071398, Longitude: 106.74318695 }, { Latitude: 10.84092999, Longitude: 106.74359131 }, { Latitude: 10.84143543, Longitude: 106.74428558 }, { Latitude: 10.84188366, Longitude: 106.74472809 }, { Latitude: 10.841817855835, Longitude: 106.744819641113 }, { Latitude: 10.841817855835, Longitude: 106.744819641113 }, { Latitude: 10.84182072, Longitude: 106.74481964 }, { Latitude: 10.84186745, Longitude: 106.74472046 }, { Latitude: 10.84229946, Longitude: 106.74510956 }, { Latitude: 10.84281635, Longitude: 106.74546814 }, { Latitude: 10.84328508, Longitude: 106.74571991 }, { Latitude: 10.84375381, Longitude: 106.74597168 }, { Latitude: 10.84419107, Longitude: 106.746147155 }, { Latitude: 10.84462833, Longitude: 106.74632263 }, { Latitude: 10.84534621, Longitude: 106.7467231725 }, { Latitude: 10.84606409, Longitude: 106.747123715 }, { Latitude: 10.84678197, Longitude: 106.7475242575 }, { Latitude: 10.84749985, Longitude: 106.7479248 }, { Latitude: 10.8474474, Longitude: 106.74800873 }, { Latitude: 10.8474473953247, Longitude: 106.748008728027 }, { Latitude: 10.8474473953247, Longitude: 106.748008728027 }, { Latitude: 10.84748936, Longitude: 106.74790955 }, { Latitude: 10.84818125, Longitude: 106.748310093333 }, { Latitude: 10.84887314, Longitude: 106.748710636667 }, { Latitude: 10.84956503, Longitude: 106.74911118 }, { Latitude: 10.85025692, Longitude: 106.749511723333 }, { Latitude: 10.85094881, Longitude: 106.749912266667 }, { Latitude: 10.8516407, Longitude: 106.75031281 }, { Latitude: 10.85159874, Longitude: 106.75041962 }, { Latitude: 10.8515968322754, Longitude: 106.750419616699 }, { Latitude: 10.8515968322754, Longitude: 106.750419616699 }, { Latitude: 10.85165119, Longitude: 106.75032806 }, { Latitude: 10.85232226, Longitude: 106.750719703333 }, { Latitude: 10.85299333, Longitude: 106.751111346667 }, { Latitude: 10.8536644, Longitude: 106.75150299 }, { Latitude: 10.8540988, Longitude: 106.75166702 }, { Latitude: 10.8545332, Longitude: 106.75183105 }, { Latitude: 10.85500717, Longitude: 106.75193024 }, { Latitude: 10.855757522, Longitude: 106.751953128 }, { Latitude: 10.856507874, Longitude: 106.751976016 }, { Latitude: 10.857258226, Longitude: 106.751998904 }, { Latitude: 10.858008578, Longitude: 106.752021792 }, { Latitude: 10.85875893, Longitude: 106.75204468 }, { Latitude: 10.85936451, Longitude: 106.75218201 }, { Latitude: 10.85987568, Longitude: 106.75248718 }, { Latitude: 10.86024952, Longitude: 106.75279999 }, { Latitude: 10.8601903915405, Longitude: 106.752876281738 }, { Latitude: 10.8601903915405, Longitude: 106.752876281738 }, { Latitude: 10.8601923, Longitude: 106.75287628 }, { Latitude: 10.86023331, Longitude: 106.75280762 }, { Latitude: 10.86077595, Longitude: 106.7532844575 }, { Latitude: 10.86131859, Longitude: 106.753761295 }, { Latitude: 10.86186123, Longitude: 106.7542381325 }, { Latitude: 10.86240387, Longitude: 106.75471497 }, { Latitude: 10.862720015, Longitude: 106.75511551 }, { Latitude: 10.86303616, Longitude: 106.75551605 }, { Latitude: 10.86289406, Longitude: 106.75563049 }, { Latitude: 10.8629007339478, Longitude: 106.755630493164 }, { Latitude: 10.8629007339478, Longitude: 106.755630493164 }, { Latitude: 10.86304665, Longitude: 106.75553131 }, { Latitude: 10.86329699, Longitude: 106.75595474 }, { Latitude: 10.86354733, Longitude: 106.75637817 }, { Latitude: 10.8638701475, Longitude: 106.7569923375 }, { Latitude: 10.864192965, Longitude: 106.757606505 }, { Latitude: 10.8645157825, Longitude: 106.7582206725 }, { Latitude: 10.8648386, Longitude: 106.75883484 }, { Latitude: 10.864725112915, Longitude: 106.758895874023 }, { Latitude: 10.864725112915, Longitude: 106.758895874023 }, { Latitude: 10.86472225, Longitude: 106.75889587 }, { Latitude: 10.86482811, Longitude: 106.75882721 }, { Latitude: 10.865143775, Longitude: 106.759456635 }, { Latitude: 10.86545944, Longitude: 106.76008606 }, { Latitude: 10.865728375, Longitude: 106.76055908 }, { Latitude: 10.86599731, Longitude: 106.7610321 }, { Latitude: 10.86591434, Longitude: 106.76111603 }, { Latitude: 10.8659143447876, Longitude: 106.761116027832 }, { Latitude: 10.8659143447876, Longitude: 106.761116027832 }, { Latitude: 10.86601257, Longitude: 106.76105499 }, { Latitude: 10.86626053, Longitude: 106.76153564 }, { Latitude: 10.86659813, Longitude: 106.76189423 }, { Latitude: 10.86707687, Longitude: 106.76228333 }, { Latitude: 10.86770439, Longitude: 106.76265717 }, { Latitude: 10.868270395, Longitude: 106.762981415 }, { Latitude: 10.8688364, Longitude: 106.76330566 }, { Latitude: 10.86878872, Longitude: 106.76339722 }, { Latitude: 10.8687896728516, Longitude: 106.763397216797 }, { Latitude: 10.8687896728516, Longitude: 106.763397216797 }, { Latitude: 10.86882591, Longitude: 106.76333618 }, { Latitude: 10.86950588, Longitude: 106.76351166 }, { Latitude: 10.87031174, Longitude: 106.76346588 }, { Latitude: 10.87082767, Longitude: 106.76360321 }, { Latitude: 10.87140751, Longitude: 106.76390076 }, { Latitude: 10.87135029, Longitude: 106.76399994 }, { Latitude: 10.8713483810425, Longitude: 106.763999938965 }, { Latitude: 10.8713483810425, Longitude: 106.763999938965 }, { Latitude: 10.87140274, Longitude: 106.76390839 }, { Latitude: 10.8719101, Longitude: 106.76423645 }, { Latitude: 10.87213993, Longitude: 106.76442719 }, { Latitude: 10.87254047, Longitude: 106.76470184 }, { Latitude: 10.87287045, Longitude: 106.7648468 }, { Latitude: 10.87318993, Longitude: 106.76499176 }, { Latitude: 10.8730402, Longitude: 106.76542664 }, { Latitude: 10.872750285, Longitude: 106.76628876 }, { Latitude: 10.87246037, Longitude: 106.76715088 }, { Latitude: 10.87240982, Longitude: 106.76750946 }, { Latitude: 10.87215996, Longitude: 106.768245695 }, { Latitude: 10.8719101, Longitude: 106.76898193 }, { Latitude: 10.8716898, Longitude: 106.76965332 }, { Latitude: 10.8716268539429, Longitude: 106.769645690918 }, { Latitude: 10.8716268539429, Longitude: 106.769645690918 }, { Latitude: 10.87159729, Longitude: 106.76964569 }, { Latitude: 10.8716917, Longitude: 106.76966858 }, { Latitude: 10.87143421, Longitude: 106.77051544 }, { Latitude: 10.87117577, Longitude: 106.77136993 }, { Latitude: 10.87087822, Longitude: 106.7722168 }, { Latitude: 10.87058067, Longitude: 106.77307129 }, { Latitude: 10.87050724, Longitude: 106.77304077 }, { Latitude: 10.8705015182495, Longitude: 106.773040771484 }, { Latitude: 10.8705015182495, Longitude: 106.773040771484 }, { Latitude: 10.87059975, Longitude: 106.77307129 }, { Latitude: 10.870448115, Longitude: 106.77352524 }, { Latitude: 10.87029648, Longitude: 106.77397919 }, { Latitude: 10.87014437, Longitude: 106.774433135 }, { Latitude: 10.86999226, Longitude: 106.77488708 }, { Latitude: 10.869840625, Longitude: 106.775344845 }, { Latitude: 10.86968899, Longitude: 106.77580261 }, { Latitude: 10.86953688, Longitude: 106.77625656 }, { Latitude: 10.86938477, Longitude: 106.77671051 }, { Latitude: 10.8692951202393, Longitude: 106.776725769043 }, { Latitude: 10.8692951202393, Longitude: 106.776725769043 }, { Latitude: 10.86930561, Longitude: 106.77672577 }, { Latitude: 10.86936855, Longitude: 106.77677917 }, { Latitude: 10.869214055, Longitude: 106.77725601 }, { Latitude: 10.86905956, Longitude: 106.77773285 }, { Latitude: 10.86890459, Longitude: 106.77820587 }, { Latitude: 10.868749619999999, Longitude: 106.77867889 }, { Latitude: 10.86869144, Longitude: 106.77865601 }, { Latitude: 10.868691444397, Longitude: 106.778656005859 }, { Latitude: 10.868691444397, Longitude: 106.778656005859 }, { Latitude: 10.86876297, Longitude: 106.77868652 }, { Latitude: 10.8685452133333, Longitude: 106.779345193333 }, { Latitude: 10.8683274566667, Longitude: 106.780003866667 }, { Latitude: 10.8681097, Longitude: 106.78066254 }, { Latitude: 10.8679059333333, Longitude: 106.781341553333 }, { Latitude: 10.8677021666667, Longitude: 106.782020566667 }, { Latitude: 10.8674984, Longitude: 106.78269958 }, { Latitude: 10.86742115, Longitude: 106.78332265 }, { Latitude: 10.8673439, Longitude: 106.78394572 }, { Latitude: 10.86726665, Longitude: 106.78456879 }, { Latitude: 10.86724567, Longitude: 106.785461426667 }, { Latitude: 10.86722469, Longitude: 106.786354063333 }, { Latitude: 10.86720371, Longitude: 106.7872467 }, { Latitude: 10.867133140564, Longitude: 106.78727722168 }, { Latitude: 10.867133140564, Longitude: 106.78727722168 }, { Latitude: 10.8671217, Longitude: 106.78727721999999 }, { Latitude: 10.86717987, Longitude: 106.78727721999999 }, { Latitude: 10.867155075, Longitude: 106.787750245 }, { Latitude: 10.86713028, Longitude: 106.78822327 }, { Latitude: 10.86710024, Longitude: 106.788917545 }, { Latitude: 10.8670702, Longitude: 106.78961182 }, { Latitude: 10.86695957, Longitude: 106.79029846 }, { Latitude: 10.8669128417969, Longitude: 106.790283203125 }, { Latitude: 10.8669128417969, Longitude: 106.790283203125 }, { Latitude: 10.86691189, Longitude: 106.7902832 }, { Latitude: 10.86675072, Longitude: 106.79098511 }, { Latitude: 10.8664875, Longitude: 106.79170227 }, { Latitude: 10.866028785, Longitude: 106.792381285 }, { Latitude: 10.86557007, Longitude: 106.7930603 }, { Latitude: 10.8650856033333, Longitude: 106.79351552 }, { Latitude: 10.8646011366667, Longitude: 106.79397074 }, { Latitude: 10.86411667, Longitude: 106.79442596 }, { Latitude: 10.8635651266667, Longitude: 106.794787086667 }, { Latitude: 10.8630135833333, Longitude: 106.795148213333 }, { Latitude: 10.86246204, Longitude: 106.79550934 }, { Latitude: 10.86194229, Longitude: 106.795832316667 }, { Latitude: 10.86142254, Longitude: 106.796155293333 }, { Latitude: 10.86090279, Longitude: 106.79647827 }, { Latitude: 10.86034441, Longitude: 106.796993255 }, { Latitude: 10.85978603, Longitude: 106.79750824 }, { Latitude: 10.8592062, Longitude: 106.79815674 }, { Latitude: 10.85934353, Longitude: 106.79833221 }, { Latitude: 10.85978953, Longitude: 106.797849016667 }, { Latitude: 10.86023553, Longitude: 106.797365823333 }, { Latitude: 10.86068153, Longitude: 106.79688263 }, { Latitude: 10.8614375575, Longitude: 106.7963924425 }, { Latitude: 10.862193585, Longitude: 106.795902255 }, { Latitude: 10.8629496125, Longitude: 106.7954120675 }, { Latitude: 10.86370564, Longitude: 106.79492188 }, { Latitude: 10.8642393766667, Longitude: 106.794504803333 }, { Latitude: 10.8647731133333, Longitude: 106.794087726667 }, { Latitude: 10.86530685, Longitude: 106.79367065 }, { Latitude: 10.8656044, Longitude: 106.7933197 }, { Latitude: 10.86590195, Longitude: 106.79296875 }, { Latitude: 10.86617661, Longitude: 106.79264832 }, { Latitude: 10.86652946, Longitude: 106.79280853 }, { Latitude: 10.866581915, Longitude: 106.793697355 }, { Latitude: 10.86663437, Longitude: 106.79458618 }, { Latitude: 10.8671875, Longitude: 106.79483795 }, { Latitude: 10.8677339553833, Longitude: 106.79508972168 }, { Latitude: 10.8677339553833, Longitude: 106.79508972168 }, { Latitude: 10.86774063, Longitude: 106.79508972 }, { Latitude: 10.868196485, Longitude: 106.79519272 }, { Latitude: 10.86865234, Longitude: 106.79529572 }, { Latitude: 10.869540215, Longitude: 106.79531479 }, { Latitude: 10.87042809, Longitude: 106.79533386 }, { Latitude: 10.87053299, Longitude: 106.79545593 }, { Latitude: 10.87048531, Longitude: 106.79631805 }, { Latitude: 10.8704223632813, Longitude: 106.796318054199 }, { Latitude: 10.8704223632813, Longitude: 106.796318054199 }, { Latitude: 10.87042236, Longitude: 106.79631805 }, { Latitude: 10.87049103, Longitude: 106.79633331 }, { Latitude: 10.87043047, Longitude: 106.79695129 }, { Latitude: 10.87036991, Longitude: 106.79756927 }, { Latitude: 10.870938775, Longitude: 106.79772186 }, { Latitude: 10.87150764, Longitude: 106.79787445 }, { Latitude: 10.87174511, Longitude: 106.79804993 }, { Latitude: 10.8717136383057, Longitude: 106.798118591309 }, { Latitude: 10.8717136383057, Longitude: 106.798118591309 }, { Latitude: 10.87171268, Longitude: 106.79811859 }, { Latitude: 10.8717556, Longitude: 106.79804993 }, { Latitude: 10.87203407, Longitude: 106.79823303 }, { Latitude: 10.87238789, Longitude: 106.79788208 }, { Latitude: 10.87270927, Longitude: 106.79769897 }, { Latitude: 10.8729248, Longitude: 106.7977066 }, { Latitude: 10.87344074, Longitude: 106.79793549 }, { Latitude: 10.8741257966667, Longitude: 106.79831696 }, { Latitude: 10.8748108533333, Longitude: 106.79869843 }, { Latitude: 10.87549591, Longitude: 106.7990799 }, { Latitude: 10.87528515, Longitude: 106.79979706 }, { Latitude: 10.87471104, Longitude: 106.79991913 }, { Latitude: 10.87421036, Longitude: 106.8002243 }, { Latitude: 10.87396288, Longitude: 106.800788875 }, { Latitude: 10.8737154, Longitude: 106.80135345 }, { Latitude: 10.874403955, Longitude: 106.80140686 }, { Latitude: 10.87509251, Longitude: 106.80146027 }, { Latitude: 10.87578154, Longitude: 106.80151749 }, { Latitude: 10.87647057, Longitude: 106.80157471 }, { Latitude: 10.87652779, Longitude: 106.80200195 }, { Latitude: 10.87652302, Longitude: 106.80256653 }, { Latitude: 10.87647629, Longitude: 106.80256653 }, { Latitude: 10.8764762878418, Longitude: 106.80256652832 }, { Latitude: 10.8764762878418, Longitude: 106.80256652832 }, { Latitude: 10.87644958, Longitude: 106.80305481 }, { Latitude: 10.87639141, Longitude: 106.80314636 }, { Latitude: 10.8763752, Longitude: 106.80324554 }, { Latitude: 10.87641239, Longitude: 106.80331421 }, { Latitude: 10.87651253, Longitude: 106.80332947 }, { Latitude: 10.87659645, Longitude: 106.80328369 }, { Latitude: 10.8766489, Longitude: 106.8032074 }, { Latitude: 10.87694168, Longitude: 106.80310822 }, { Latitude: 10.87723446, Longitude: 106.80300903 }, { Latitude: 10.87770557, Longitude: 106.80284119 }, { Latitude: 10.87817192, Longitude: 106.80268097 }, { Latitude: 10.8781824111938, Longitude: 106.802734375 }, { Latitude: 10.878182, Longitude: 106.802731 }]

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
                        pinColor="green"
                        title={"Trạm"}
                        description={point.Name}
                        opacity={0.8}
                    />
                ))}

                <Polyline
                    coordinates={path.map((point) => ({
                        latitude: point.Latitude,
                        longitude: point.Longitude,
                    }))}
                    strokeWidth={8}
                    strokeColor="rgba(255, 119, 84, 0.9)"
                />
            </MapView>
        </View>
    );
};

export default Tracking;
