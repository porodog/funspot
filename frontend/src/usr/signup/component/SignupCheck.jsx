import React, { useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const SignupCheck = () => {
  const navigate = useNavigate();
  const [open1, setOpen1] = useState(true);
  const [open2, setOpen2] = useState(true);
  const [open3, setOpen3] = useState(true);
  const [open4, setOpen4] = useState(false);

  const data = [
    {
      id: 0,
      title: "만 14세 이상입니다.",
      contents: `만 14세 미만인 경우
①
회원은 회원가입 시 등록한 사항에 변경이 있는 경우, 상당한 기간 이내에 “플랫폼”에 대하여 회원정보 수정하거나 이메일 등의 방법으로 그 변경사항을 알려야 합니다.
②
“회사”는 관련법령에 따라 필요한 경우 별도의 성인인증 절차를 실시할 수 있습니다.`,
      status: "[필수]",
    },
    {
      id: 1,
      title: "FunSpot 서비스 이용약관 동의",
      contents: `제1조
목적
이 약관은 주식회사 FunSpot(이하 “회사”라 함)가 운영하는 맞춤여행에 특화된 광고 플랫폼(이하 “플랫폼”이라 한다)에서 제공하는 큐레이션 및 중개, 판매 서비스(이하 “서비스”라 함)를 이용함에 있어 “회사”와 “이용자”의 권리․의무 및 책임사항을 규정함을 목적으로 합니다.

「PC통신, 무선 등을 이용하는 경우에 대해서도 그 성질에 반하지 않는 한 이 약관을 준용합니다.」

제2조
정의
①
“플랫폼”이란 “이용자”가 컴퓨터 등 정보통신설비를 이용하여 “서비스”를 이용할 수 있도록 “회사”가 제공하는 가상의 영업장을 말하며, 아울러 “플랫폼”을 운영하는 사업자의 의미로도 사용합니다.
②
“이용자”란 “플랫폼”을 통하여 이 약관에 따라 제공하는 서비스를 받는 주체를 말하며. “플랫폼”이 제공하는 서비스의 일부 또는 전체를 이용할 수 있는 자를 말합니다.
③
“회원”이라 함은 “플랫폼”에 회원등록을 한 자로서, 약관에 전체 동의를 하고 계속적으로 “플랫폼”이 제공하는 서비스의 전체를 이용 할 수 있는 자를 말합니다.
제3조
약관 등의 명시와 설명 및 개정
①
“회사”는 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소(소비자의 불만을 처리할 수 있는 곳의 주소를 포함), 전화번호, 팩스, 이메일주소, 사업자등록번호, 통신판매업 신고번호, 개인정보보호책임자등을 “이용자”가 쉽게 알 수 있도록 “앱 설정”에 게시합니다. 다만, 약관의 내용은 “이용자”가 연결화면을 통하여 볼 수 있도록 할 수 있습니다.
②
“회사”는 「전자상거래 등에서의 소비자보호에 관한 법률」, 「약관의 규제에 관한 법률」, 「전자문서 및 전자거래기본법」, 「전자금융거래법」, 「전자서명법」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」, 「소비자기본법」 등 관련 법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
③
“회사”가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 “앱의 초기화면”에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다. 이 경우 “회사”는 개정 전 내용과 개정 후 내용을 “이용자”가 알기 쉽도록 표시합니다.
④
“이용자”는 변경된 약관에 동의하지 않을 권리가 있으며, 동의하지 않을 경우에는 서비스 이용을 중단하고 탈퇴할 수 있습니다.
⑤
“이용자”가 전4항에 따라 약관에 대한 반대의사를 표시하지 않고 “서비스”를 이용한 경우에는 약관에 동의한 것으로 봅니다.
⑥
이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제 등에 관한 법률 및 관계법령 또는 상관례에 따릅니다.
제4조
회원가입
①
“이용자”는 “플랫폼”이 정한 절차에따라 이 약관에 전체 동의한다는 의사표시를 함으로서 회원가입을 신청합니다.
②
“회사”는 제1항과 같이 회원으로 가입할 것을 신청한 “이용자” 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다.
⒈
회원자격 상실 후 2주가 경과하지 않은 경우
⒉
등록 내용에 타인의 정보를 사용한 경우
⒊
제5조
회원 탈퇴 및 자격 상실 등
①
회원은 “회사”에 언제든지 탈퇴를 요청할 수 있으며 “회사”는 신속하게 회원탈퇴를 처리합니다. 이 경우 제공된 쿠폰 및 포인트, 팝패스 구독 혜택은 모두 소멸합니다.
②
회원이 다음 각 호의 사유에 해당하는 경우, “플랫폼”은 회원자격을 제한 및 정지시킬 수 있습니다.
⒈
가입 신청 시에 허위 내용을 등록한 경우
⒉
다른 사람의 “플랫폼” 이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를 위협하는 경우
⒊
“플랫폼”을 이용하여 법령 또는 이 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우
⒋
제19조에 따른 “이용자”의 의무를 지키지 아니하였을 경우
③
“회사”가 회원 자격을 제한․정지 시킨 후, 같은 행위가 2회 이상 반복되거나 30일 이내에 그 사유가 시정되지 아니하는 경우 “회사”는 회원자격을 상실시킬 수 있습니다.
제6조
회원에 대한 통지
⒈
“회사”가 회원에 대한 통지를 하는 경우, 회원이 “회사”에게 제공한 이메일, SMS 혹은 APP 메세지로 할 수 있습니다.
⒉
“회사”는 불특정다수 회원에 대한 통지의 경우 1주일이상 “앱 초기화면” 에 게시함으로써 개별 통지에 갈음할 수 있습니다. 다만, 회원 본인의 거래와 관련하여 중대한 영향을 미치는 사항에 대하여는 개별 통지합니다.
제7조
서비스의 제공 및 변경
①
“플랫폼”은 다음과 같은 업무를 수행합니다.
⒈
제휴점 및 데이트와 관련된 정보 제공
⒉
서비스이용에 대한 청약 접수
⒊
구매계약이 체결된 서비스에 대한 통지
⒋
기타 “플랫폼”이 정하는 업무
②
“플랫폼”이 “이용자”에게 접수한 청약에 대한 변경내용 및 계약을 체결한 서비스의 내용을 재화등의 품절 또는 기술적 사양의 변경 등의 사유로 변경할 경우에는 그 사유를 “이용자”에게 통지 가능한 연락처로 신속하게 통지합니다.
③
전항의 경우 “플랫폼”은 이로 인하여 “이용자”가 입은 손해를 배상합니다. 다만, “플랫폼”이 고의 또는 과실없음을 입증하는 경우에는 그러하지 아니합니다.
제8조
서비스의 이용시간 및 중단
①
“플랫폼”의 이용은 특별한 사유가 없는 한 연중무휴 1일 24시간을 원칙으로 합니다. 다만, 컴퓨터 등 정보통신설비의 보수점검․교체 및 고장, 통신의 두절 등의 사유 또는 정기점검 등의 필요로 “회사”가 지정한 날 등의 경우에는 “플랫폼”을 일시적으로 중단할 수 있습니다.
②
“회사”는 “플랫폼”의 원활한 운영을 위하여 기간을 정하여 사전에 공지하고 서비스를 중지할 수 있으며, 불가피하게 긴급한 조치를 하여야 하는 경우 사후에 통지할 수 있습니다.
③
고객센터의 운영시간은 점심시간 (정오부터 오후1시까지)을 제외한 당일 오전 9시부터 오후 6시까지 이며, 공휴일은 휴무입니다.
제9조
서비스 이용 및 개인정보 제공 동의 등
①
“이용자”는 “플랫폼”상에서 다음 또는 이와 유사한 방법에 의하여 서비스를 이용하며, “플랫폼”은 “이용자”가 서비스를 이용을 함에 있어서 다음의 각 내용을 알기 쉽게 제공하여야 합니다.
⒈
제휴점 등의 검색 및 선택
⒉
취소•환불이 제한되는 상품안내, 제휴점별 이용규정 및 취소환불규정의 동의 등 비용부담과 관련한 내용
⒊
개인정보 제 3자 제공 동의 및 개인정보 수집 이용 동의여부에 대한 표시`,
      status: "[필수]",
    },
    {
      id: 2,
      title: "개인정보 수집 및 이용 동의",
      contents: `1. 개인정보 수집, 이용, 제공에 대한 동의
회사는 이용자가 회사의 개인정보취급방침 또는 이용약관의 내용에 대해 “동의함" 또는 "동의하지 않음" 을 클릭할 수 있는 절차를 마련하여 "동의함”을 선택하면 개인정보 수집에 대해 동의한 것으로 봅니다 . 단, 회사는 다음 각 호의 어느 하나에 해당하는 경우에는 법령에 따라 이와 같은 동의 없이 이용자의 개인정보 수집 이용할 수 있습니다.

⓵정보통신서비스의 제공에 관한 계약을 이행하기 위하여 필요한 개인정보로서 경제적 기술적인 사유로 통상적인 동의를 받는 것이 뚜렷하게 곤란한 경우
⓶정보통신서비스 제공에 따른 요금정산을 위하여 필요한 경우
⓷그 밖에 법률에 특별한 규정이 있는 경우`,
      status: "[필수]",
    },
    {
      id: 3,
      title: "마케팅 정보 수신에 대한 동의",
      contents: `FunSpot은 개인정보보호법 등에 관한 법률 등 관계법령에 따라 광고성 정보를 전송하기 위해 수신자의 사전 수신동의를 받고 있으며, 광고 성 정보 수신자의 수신동의여부를 정기적 으로 확인합니다. 다만 동의하지 않을 경우, 상품/서비스 소개 및 권유, 사은행사, 판촉행사 등 이용목적에 따른 혜택의 제한이 있을 수 있습니다. 그 밖에 금융 거래와 관련된 불이익은 없습니다.
● 전송방법
고객님의 핸드폰 문자메시지(SMS), Email 등을 통해 전달될 수 있습니다.
● 전송내용
발송되는 마케팅 정보는 수신자에게 FunSpot이 운영하는 서비스에서 제공하는 혜택 정보, 각종 이벤트 정보, 상품 정보, 신규 서비스 안내 등 광고성 정보로 관련 법의 규정을 준수하여 발송됩니다. 단, 광고성 정보 이외 의무적으로 안내되어야 하는 정보성 내 용은 수신동의 여부와 무관하게 제공됩니다.
● 철회안내
고객님은 수신 동의 이후에라도 의사에 따라 동의를 철회할 수 있으며, 수신을 동의하지 않아도 회사가 제공하는 기본적인 서비스를 이용할 수 있으나, 당사의 마케팅 정보를 수신하지 못할 수 있습니다.
● 수신동의 변경
고객센터를 통해 수신동의를 변경(동의/철회)할 수 있습니다.
● 개인정보 이용 상세내용
휴대전화번호, 이메일주소
● 이용하는 개인정보 항목 보유 이용 목적
혜택 정보, 각종 이벤트 정보, 상품 정보, 신규 서비스 안내 등 광고 성 정보 제공
● 개인정보 보유 및 이용 기간
마케팅 활용 동의일로부터 회원 탈퇴 또는 마케팅 동의 철회 시까지 보유 및 이용`,
      status: "[선택]",
    },
  ];

  const [checkItems, setCheckItems] = useState([]);

  const requiredIds = data
    .filter((item) => item.status === "[필수]")
    .map((item) => item.id);

  const selectChecked = (checked, id) => {
    if (checked) {
      setCheckItems((item) => [...item, id]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  const allChecked = (checked) => {
    if (checked) {
      const itemList = [];
      data.forEach((el) => itemList.push(el.id));
      setCheckItems(itemList);
    } else {
      setCheckItems([]);
    }
  };

  const handleSubmit = () => {
    const hasAllRequiredChecked = requiredIds.every((id) =>
      checkItems.includes(id)
    );
    if (!hasAllRequiredChecked) {
      alert("필수사항을 모두 체크해주세요.");
      return;
    }
    navigate("/signup");
  };

  return (
    <div className="flex items-center justify-center py-10">
      <div className="p-5 border border-gray-300 rounded-lg w-96 bg-white">
        {/* 모두 동의합니다 */}
        <div className="flex items-center justify-between mb-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="all-checked"
              onChange={(e) => allChecked(e.target.checked)}
              checked={checkItems.length === data.length}
              className="mr-2"
            />
            모두 동의합니다.
          </label>
          <div className="cursor-pointer">
            {open1 && open2 && open3 && open4 ? (
              <MdOutlineKeyboardArrowUp
                size={30}
                color="gray"
                onClick={() => {
                  setOpen1(!open1);
                  setOpen2(!open2);
                  setOpen3(!open3);
                  setOpen4(!open4);
                }}
              />
            ) : (
              <MdOutlineKeyboardArrowDown
                size={30}
                color="gray"
                onClick={() => {
                  setOpen1(!open1);
                  setOpen2(!open2);
                  setOpen3(!open3);
                  setOpen4(!open4);
                }}
              />
            )}
          </div>
        </div>
        <hr className="border-gray-200" />

        {/* 개별 선택 */}
        {data.map((item, index) => (
          <div key={item.id}>
            <div className="flex items-center justify-between my-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="select-checked"
                  onChange={(e) => selectChecked(e.target.checked, item.id)}
                  checked={checkItems.includes(item.id)}
                  className="mr-2"
                />
                <span
                  className={`mr-1 ${
                    item.status === "[필수]" ? "text-red-500" : "text-gray-500"
                  }`}
                >
                  {item.status}
                </span>{" "}
                {item.title}
              </label>
              <div className="cursor-pointer">
                {(index === 0 && open1) ||
                (index === 1 && open2) ||
                (index === 2 && open3) ||
                (index === 3 && open4) ? (
                  <MdOutlineKeyboardArrowUp
                    size={30}
                    color="gray"
                    onClick={() => {
                      if (index === 0) setOpen1(!open1);
                      else if (index === 1) setOpen2(!open2);
                      else if (index === 2) setOpen3(!open3);
                      else if (index === 3) setOpen4(!open4);
                    }}
                  />
                ) : (
                  <MdOutlineKeyboardArrowDown
                    size={30}
                    color="gray"
                    onClick={() => {
                      if (index === 0) setOpen1(!open1);
                      else if (index === 1) setOpen2(!open2);
                      else if (index === 2) setOpen3(!open3);
                      else if (index === 3) setOpen4(!open4);
                    }}
                  />
                )}
              </div>
            </div>
            {/* 약관 내용에만 스크롤 추가 */}
            {(index === 0 && open1) ||
            (index === 1 && open2) ||
            (index === 2 && open3) ||
            (index === 3 && open4) ? (
              <div className="bg-gray-100 mt-2 p-3 rounded-md border border-gray-300 mb-2 h-40 overflow-y-scroll">
                <pre className="whitespace-pre-wrap text-sm">
                  {item.contents}
                </pre>
              </div>
            ) : null}
          </div>
        ))}
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            backgroundColor: "#25e2b6",
            "&:hover": {
              backgroundColor: "#20c7a0", // 호버 시 조금 어두운 색상
            },
          }}
          className="w-full mt-5"
        >
          동의하고 진행하기
        </Button>
      </div>
    </div>
  );
};

export default SignupCheck;
