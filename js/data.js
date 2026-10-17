/**
 * Portfolio Data & Internationalization (VI & EN)
 * Lê Đức Việt - Digital Marketing Executive / Performance & Growth
 */

const PORTFOLIO_DATA = {
  "vi": {
    "nav": {
      "about": "Giới thiệu",
      "services": "Năng lực cốt lõi",
      "projects": "Case Studies",
      "skills": "Kỹ năng",
      "journey": "Kinh nghiệm",
      "contact": "Liên hệ",
      "cta": "Tải CV"
    },
    "hero": {
      "badge": "Sẵn sàng nhận cơ hội việc làm & Hợp tác chiến lược",
      "greeting": "Xin chào, mình là",
      "name": "Lê Đức Việt",
      "role": "Digital Marketing Executive",
      "subRole": "Performance & Growth Marketing | 2+ Năm Thực Chiến",
      "bio": "2+ năm kinh nghiệm thực chiến vận hành Paid Ads (Meta, TikTok Shop GMV Max), xây dựng phễu lead B2B đo lường đến tận đơn chốt, và quản lý mạng lưới KOC/Affiliate. Tập trung vào tối ưu chi phí (CPL/CAC), tăng trưởng ROAS và đo lường chuyển đổi thực tế.",
      "btnProjects": "Xem Case Studies",
      "btnContact": "Liên hệ hợp tác",
      "stats": [
        {
          "value": 1500,
          "suffix": "+",
          "label": "MQLs Đạt Chuẩn (Lead B2B & B2C)"
        },
        {
          "value": 53,
          "suffix": "",
          "label": "Đại lý / NPP Chốt Ký Hợp Đồng"
        },
        {
          "value": 34,
          "suffix": "%",
          "label": "Tỉ Lệ Chốt Đơn Qua Chat (Agrizen)"
        },
        {
          "value": 10,
          "suffix": "x+",
          "label": "ROI GMV Max Trên TikTok Shop"
        }
      ],
      "avatar": "assets/images/intern_Marketing__2__cropped_jpg_1791365154973.jpg"
    },
    "about": {
      "tag": "VỀ BẢN THÂN & CÁCH LÀM VIỆC",
      "title": "Tập trung vào số liệu thực tế, kiểm soát chi phí và tăng trưởng doanh thu",
      "desc1": "Chào bạn, mình là Việt. Mình làm Digital Marketing với tư duy thực chiến: ngân sách bỏ ra phải tạo ra kết quả đo đếm được — dù là số lượng lead đại lý B2B, đơn hàng trên TikTok Shop hay doanh thu thực tế về túi doanh nghiệp.",
      "desc2": "Mình trực tiếp thực thi (hands-on) từ khâu nghiên cứu tệp khách hàng, lên cấu trúc chiến dịch quảng cáo, sản xuất brief nội dung cho KOC, cho đến tự build dashboard Google Sheets/AI để kiểm soát chỉ số CPL, CTR, ROAS mỗi ngày. Không làm marketing theo cảm tính.",
      "coreValues": [
        {
          "title": "Đo lường tận đáy phễu (End-to-End Funnel)",
          "desc": "Không dừng lại ở Reach hay CPL rẻ. Mình chủ động đối soát cùng đội Sales để theo dõi MQL, SQL và tỷ lệ chốt hợp đồng thực tế."
        },
        {
          "title": "Kỷ luật chi phí & Thử nghiệm liên tục",
          "desc": "Kiểm soát chặt chẽ ngân sách theo vùng (Geo-targeting) và liên tục A/B test creative/tệp để duy trì ROAS dương và hạ chi phí chuyển đổi."
        },
        {
          "title": "Nội dung phục vụ chuyển đổi",
          "desc": "Chuẩn hóa brief, guideline DO/DON'T cho KOC và affiliate; tập trung vào hook giữ chân và insight giải quyết đúng nỗi đau của khách hàng."
        }
      ]
    },
    "services": {
      "tag": "NĂNG LỰC CỐT LÕI",
      "title": "Năng Lực & Kinh Nghiệm Thực Chiến",
      "subtitle": "Hệ thống chuyên môn mình trực tiếp phụ trách, vận hành và tối ưu kết quả.",
      "items": [
        {
          "id": "performance-ads",
          "icon": "ri-line-chart-line",
          "title": "Performance Marketing & ROAS",
          "desc": "Setup, A/B test và tối ưu quảng cáo Meta Ads (Lead, Messenger, Retargeting) & TikTok Shop GMV Max. Kiểm soát CPL và giữ ROI dương ổn định.",
          "deliverables": [
            "Meta Ads: Lead Gen B2B, Messenger & Retargeting",
            "TikTok Shop: GMV Max & Live GMV Max",
            "A/B Testing creative, hook và scaling ngân sách"
          ]
        },
        {
          "id": "b2b-leadgen",
          "icon": "ri-filter-3-line",
          "title": "B2B Lead Generation & Phễu Chuyển Đổi",
          "desc": "Thiết kế luồng chuyển đổi từ quảng cáo đến lúc chốt hợp đồng đại lý/NPP; phân tầng MQL/SQL và đối soát trực tiếp cùng Sales Admin.",
          "deliverables": [
            "Mô hình phễu 4 tầng: Lead → IQL → MQL → Close-won",
            "Kịch bản tin nhắn & Biểu mẫu thu thập thông tin",
            "Báo cáo đường ống lead & Tỉ lệ chốt đơn"
          ]
        },
        {
          "id": "ecommerce-ops",
          "icon": "ri-shopping-bag-3-line",
          "title": "E-commerce & TikTok Shop Operations",
          "desc": "Tối ưu trang gian hàng Shop Mall, chuẩn hóa SEO tiêu đề sản phẩm, thumbnail bắt mắt và kết hợp combo SKU để kéo AOV.",
          "deliverables": [
            "Tối ưu Storefront & Thumbnail chuẩn Mall",
            "SEO Listing & Nghiên cứu từ khóa tìm kiếm",
            "Chiến lược Combo SKU & Đấu thầu Live Flash Sale"
          ]
        },
        {
          "id": "koc-affiliate",
          "icon": "ri-team-line",
          "title": "KOC & Affiliate Management",
          "desc": "Xây dựng Brand Briefing Guideline (DO/DON'T), tuyển chọn KOC đúng tệp khách hàng, seeding sản phẩm và kiểm soát thông điệp thương hiệu trên TikTok.",
          "deliverables": [
            "Bộ Content Brief & Quy chuẩn DO/DON'T",
            "Lọc tệp, seeding và quản lý tiến độ KOC",
            "Tối ưu hoa hồng & Lọc video chuyển đổi cao"
          ]
        }
      ]
    },
    "projects": {
      "tag": "CASE STUDIES THỰC CHIẾN",
      "title": "Case Studies Thực Chiến",
      "subtitle": "Chi tiết 6 dự án thực tế: Mục tiêu cốt lõi (Key Objectives), Các bước triển khai (Steps), Thành tựu đo lường (Achievements) và Bài học thực tiễn.",
      "filterAll": "Tất cả",
      "filterCategories": {
        "performance": "Performance & Lead Gen",
        "ecommerce": "TikTok Shop & E-com",
        "planning": "Market Planning",
        "affiliate": "KOC & Affiliate",
        "growth": "Brand Growth",
        "content": "SEO & Content"
      },
      "viewDetail": "Xem Case Study Chi Tiết",
      "list": [
        {
          "id": "fujiwa-dealer-leadgen",
          "category": "performance",
          "title": "Tuyển Đại Lý & Nhà Phân Phối Toàn Quốc Cho Fujiwa Bằng Phễu Lead B2B",
          "client": "Fujiwa Việt Nam",
          "period": "02/2026 – 05/2026",
          "role": "Digital Marketing Executive – Lập kế hoạch, setup & tối ưu Meta Ads, phối hợp Sales Admin theo dõi lead pipeline và tự dựng KPI dashboard.",
          "image": "assets/images/case-fujiwa-dealer-leadgen.jpg",
          "heroMetric": "CPL < 130K | 53 Đại lý chốt",
          "highlight": "Xây phễu lead B2B từ quảng cáo Meta đến chốt hợp đồng đại lý toàn quốc với CPL < 130K và 53 đại lý ký hợp đồng thành công.",
          "objective": "• Bối cảnh: Fujiwa cần mở rộng mạng lưới đại lý và nhà phân phối nước i-on kiềm trên toàn quốc với ngân sách ~200 triệu VNĐ.\n• Bài toán: Khách hàng mục tiêu là chủ đại lý, cửa hàng tạp hóa, nhà thuốc — quy mô tệp nhỏ, thời gian ra quyết định dài và cần nhiều thông tin chính sách chiết khấu trước khi hợp tác.\n• Key Objectives: (1) Kiểm soát CPL mục tiêu dưới 150.000đ/lead; (2) Thu về tối thiểu 600 lead có nhu cầu mở đại lý; (3) Đo lường khép kín đến tận hợp đồng chốt ký (Close-won) thay vì dừng lại ở số lượt gửi tin nhắn thông thường.",
          "strategy": [
            "Bước 1 – Nghiên cứu tệp & Geo-targeting: Chia chiến dịch theo từng khu vực địa lý trọng điểm (miền Nam, miền Tây, Tây Nguyên) chạy song song với nhóm Blank targeting để thuật toán Meta tự dò tìm chủ kinh doanh tiềm năng; dồn ngân sách vào các vùng có chi phí lead tốt nhất.",
            "Bước 2 – Chuẩn hóa Offer & Creative: Phối hợp cùng team Thiết kế và Sales Admin đóng gói chính sách đại lý hấp dẫn (chiết khấu cao, hỗ trợ POSM/biển bảng, ưu đãi độc quyền khu vực) làm hook truyền thông xuyên suốt các mẫu quảng cáo.",
            "Bước 3 – Thiết lập phễu lọc Lead 4 tầng: Thiết kế luồng chuyển đổi chặt chẽ: Chat Messenger → Information Qualified Lead (IQL - để lại SĐT/địa chỉ) → Marketing Qualified Lead (MQL - đạt tiêu chuẩn vốn/mặt bằng) → Close-won (ký hợp đồng đại lý).",
            "Bước 4 – Vận hành KPI Dashboard & Đối soát Sales: Tự dựng Custom Dashboard theo dõi chi phí/lead theo thời gian thực; định kỳ đối soát hàng tuần với Sales Admin để loại trừ tệp lead không liên lạc được và tối ưu lại nhóm quảng cáo mang về nhiều hợp đồng nhất."
          ],
          "results": [
            {
              "val": "758",
              "label": "Lead muốn làm đại lý / NPP"
            },
            {
              "val": "< 130K",
              "label": "Chi phí / Lead (VNĐ)"
            },
            {
              "val": "312",
              "label": "Marketing Qualified Leads (MQL)"
            },
            {
              "val": "53",
              "label": "Đại lý / NPP chốt ký thành công"
            }
          ],
          "learnings": [
            "Với Lead B2B, chất lượng lead (MQL và Close-won) quan trọng hơn CPL rẻ. Tối ưu adset theo dữ liệu chốt của Sales giúp tránh lãng phí ngân sách vào tệp tò mò.",
            "Bước tiếp theo: Tích hợp Meta Conversions API (CAPI) đẩy dữ liệu hợp đồng ký từ CRM ngược về Meta để thuật toán tự động học theo chân dung đại lý thực tế."
          ],
          "tags": [
            "Meta Ads",
            "B2B Lead Gen",
            "Geo-targeting",
            "A/B Testing",
            "Sales Pipeline"
          ],
          "desc": "Xây phễu lead B2B từ quảng cáo Meta đến chốt hợp đồng đại lý toàn quốc với CPL < 130K và 53 đại lý ký hợp đồng thành công.",
          "shortDesc": "Xây phễu lead B2B từ quảng cáo Meta đến chốt hợp đồng đại lý toàn quốc với CPL < 130K và 53 đại lý ký hợp đồng thành công."
        },
        {
          "id": "agrizen-market-entry",
          "category": "planning",
          "title": "Thâm Nhập Thị Trường Phân Bón Hữu Cơ Agrizen Tại Tây Nguyên & Miền Tây",
          "client": "Agrizen – Phân bón hữu cơ vi sinh",
          "period": "05/2025 – 01/2026",
          "role": "Performance Marketing – Nghiên cứu thị trường, chân dung khách hàng, phân bổ ngân sách và vận hành Meta Ads (Messenger, Video Views, Retargeting).",
          "image": "assets/images/case-agrizen-market-planning.jpg",
          "heroMetric": "Doanh thu đỉnh 1,2 tỷ | CIR 37,86%",
          "highlight": "Chiến lược thâm nhập thị trường ngách: Chọn đúng vùng trọng điểm, USP minh bạch và phễu chốt đơn Messenger đạt tỉ lệ chốt 34,4%.",
          "objective": "• Bối cảnh: Thị trường phân bón bị chiếm lĩnh bởi các thương hiệu lớn lâu năm (Phân bón Cà Mau, Phú Mỹ, Con Cò). Người nông dân có thói quen mua tại đại lý quen và mất niềm tin bởi vấn nạn phân bón giả tràn lan trên mạng.\n• Bài toán: Agrizen là thương hiệu mới, ngân sách có hạn, không thể chạy dàn trải toàn quốc.\n• Key Objectives: (1) Thâm nhập thành công 2 vùng thị trường ngách; (2) Giữ CIR (Cost-to-Income Ratio) dưới 40%; (3) Đạt tỷ lệ chốt đơn qua tư vấn Messenger > 30% và duy trì tỷ lệ mua lại (Retention) cao theo mùa vụ.",
          "strategy": [
            "Bước 1 – Nghiên cứu vùng & Xác định USP ngách: Chọn 2 vùng trọng điểm: Tây Nguyên (cây sầu riêng, cà phê) và Miền Tây (cây ăn trái, đất nhiễm mặn) – nơi nhu cầu cải tạo đất rất cấp bách. Định vị USP: Phân bón vi sinh đậm đặc giải độc đất, minh bạch giấy kiểm định và có mã QR truy xuất nguồn gốc.",
            "Bước 2 – Phễu Video Views làm ấm tệp: Sản xuất chuỗi video mộc mạc quay thực tế tại vườn nhà nông, đo lường tỷ lệ xem > 50% thời lượng để lọc ra tệp chủ vườn đang gặp vấn đề vàng lá, thối rễ.",
            "Bước 3 – Retargeting & Chốt đơn qua Messenger: Dành 25–30% ngân sách retargeting tệp đã xem video bằng tin nhắn Messenger với kịch bản tư vấn bệnh cây cụ thể theo từng loại cây trồng, giải tỏa nghi ngại về hàng giả.",
            "Bước 4 – Nuôi dưỡng tệp & Nhắc mùa vụ: Xây dựng bảng theo dõi chu kỳ mùa vụ của từng vùng để đội ngũ chăm sóc khách hàng nhắn tin nhắc lịch bón phân, thúc đẩy khách hàng cũ đặt lại đơn."
          ],
          "results": [
            {
              "val": "1.223",
              "label": "Marketing Qualified Leads (MQL)"
            },
            {
              "val": "423",
              "label": "Đơn hàng chốt qua Messenger"
            },
            {
              "val": "34,42%",
              "label": "Tỉ lệ chốt đơn (Close Rate)"
            },
            {
              "val": "60,98%",
              "label": "Tỉ lệ khách mua lại (Retention)"
            }
          ],
          "learnings": [
            "Trong ngành nông nghiệp, sự chân thực (vườn thực nghiệm, kiểm định, review của nhà nông) có sức thuyết phục cao gấp nhiều lần hình ảnh đồ họa bóng bẩy.",
            "Tỉ lệ khách quay lại ~61% mang lại giá trị vòng đời (LTV) lớn; bước kế tiếp là triển khai Zalo ZNS / Mini App để tự động hóa kịch bản chăm sóc theo lịch mùa vụ."
          ],
          "tags": [
            "Market Planning",
            "Meta Ads",
            "Messenger Funnel",
            "Retargeting",
            "Agriculture Marketing"
          ],
          "desc": "Chiến lược thâm nhập thị trường ngách: Chọn đúng vùng trọng điểm, USP minh bạch và phễu chốt đơn Messenger đạt tỉ lệ chốt 34,4%.",
          "shortDesc": "Chiến lược thâm nhập thị trường ngách: Chọn đúng vùng trọng điểm, USP minh bạch và phễu chốt đơn Messenger đạt tỉ lệ chốt 34,4%."
        },
        {
          "id": "fujiwa-tiktok-shop",
          "category": "ecommerce",
          "title": "Tối Ưu Gian Hàng TikTok Shop & Vận Hành GMV Max Cho Nước I-on Kiềm Fujiwa",
          "client": "Fujiwa Việt Nam",
          "period": "02/2026 – 05/2026",
          "role": "E-commerce & Ads Specialist – Vận hành quảng cáo GMV Max & Live GMV Max, tối ưu Storefront Mall, Listing SEO và Thumbnail.",
          "image": "assets/images/case-fujiwa-tiktok-shop.jpg",
          "heroMetric": "GMV Max ROI 10.6x | Live ROI 30x+",
          "highlight": "Kết hợp tối ưu quảng cáo GMV Max với tối ưu trang gian hàng (Storefront, SEO Listing, combo SKU) để duy trì ROI trên 10x.",
          "objective": "• Bối cảnh: Fujiwa đẩy mạnh kênh bán lẻ trực tuyến trên TikTok Shop Mall cho các dòng nước đóng chai, bình tiện lợi và nước súc miệng.\n• Bài toán: Ngành nước uống cạnh tranh gay gắt, giá trị đơn nhỏ và phí vận chuyển hàng nặng/cồng kềnh là rào cản lớn đối với người mua.\n• Key Objectives: (1) Duy trì ROI quảng cáo dương bền vững (> 6x); (2) Đẩy mạnh giá trị đơn hàng trung bình (AOV) qua cơ cấu combo SKU; (3) Tối đa hóa doanh thu trong các phiên Mega Live với chi phí trên mỗi đơn hàng được kiểm soát chặt chẽ.",
          "strategy": [
            "Bước 1 – Tối ưu Storefront & Chuẩn hóa Thumbnail: Thiết kế lại toàn bộ banner trang chủ, phân loại danh mục rõ ràng; thumbnail sản phẩm làm nổi bật logo Mall, voucher độc quyền và quà tặng kèm để tối đa hóa CTR.",
            "Bước 2 – SEO Listing theo Search Intent: Tối ưu tiêu đề và mô tả sản phẩm chứa từ khóa người dùng tìm kiếm nhiều (nước ion kiềm bù khoáng, nước súc miệng kiềm, thùng nước văn phòng) nhằm kéo thêm traffic tự nhiên miễn phí.",
            "Bước 3 – Chiến lược Combo SKU kéo AOV: Ghép các sản phẩm bán chạy thành combo (Thùng chai 450ml + Chai 1.25L + Nước súc miệng) vừa giúp khách hàng có giá hời vừa tăng giá trị đơn hàng để hấp thu phí ship.",
            "Bước 4 – Đấu thầu Live GMV Max & Chạy GMV Max duy trì: Đầu phiên Live đặt target ROI cao với ngân sách cố định để thuật toán tìm đúng người mua thực sự; vào giờ vàng hạ nhẹ target ROI và nới lỏng ngân sách để bùng nổ doanh số. Ngày thường chạy GMV Max kết hợp video của KOC để gom đơn liên tục."
          ],
          "results": [
            {
              "val": "10,6x",
              "label": "ROI GMV Max (T4/2026)"
            },
            {
              "val": "43,8 tr",
              "label": "Doanh thu GMV Max / Tháng"
            },
            {
              "val": "~19.900đ",
              "label": "Chi phí Ads / Đơn hàng"
            },
            {
              "val": "30x+",
              "label": "ROI phiên Live ngày Mega Sale"
            }
          ],
          "learnings": [
            "Cơ cấu combo và hình ảnh thumbnail chuẩn e-com tác động trực tiếp đến Conversion Rate và AOV mạnh hơn việc chỉ đơn thuần tăng ngân sách ads.",
            "Bước tiếp theo: Theo dõi chỉ số Blended ROAS (tổng GMV toàn shop chia cho tổng chi phí ads) để đánh giá chính xác tác động lan tỏa của quảng cáo tới lượng đơn hàng tự nhiên."
          ],
          "tags": [
            "TikTok Shop",
            "GMV Max",
            "Live GMV Max",
            "Storefront CRO",
            "Combo SKU"
          ],
          "desc": "Kết hợp tối ưu quảng cáo GMV Max với tối ưu trang gian hàng (Storefront, SEO Listing, combo SKU) để duy trì ROI trên 10x.",
          "shortDesc": "Kết hợp tối ưu quảng cáo GMV Max với tối ưu trang gian hàng (Storefront, SEO Listing, combo SKU) để duy trì ROI trên 10x."
        },
        {
          "id": "fujiwa-affiliate-koc",
          "category": "affiliate",
          "title": "Xây Mạng Lưới KOC & Affiliate Cho Fujiwa Với Brand Brief Chuẩn Hóa",
          "client": "Fujiwa Việt Nam",
          "period": "02/2026 – 05/2026",
          "role": "KOC / Affiliate Specialist – Tìm kiếm & chọn lọc KOC, seeding hàng mẫu, xây dựng Brand Briefing Guideline và kiểm soát thông điệp.",
          "image": "assets/images/case-fujiwa-affiliate.jpg",
          "heroMetric": "151K+ Views | 28 Video chất lượng",
          "highlight": "Mở rộng nội dung review đa kênh qua mạng lưới creator affiliate mà vẫn bảo toàn 100% định vị thương hiệu và quy chuẩn y tế.",
          "objective": "• Bối cảnh: Fujiwa cần nhân bản số lượng video review sản phẩm trên TikTok để tăng độ phủ và gắn giỏ hàng chuyển đổi mà không làm phình to chi phí sản xuất in-house.\n• Bài toán: Khi nhiều creator tự do sáng tạo nội dung, thông điệp rất dễ bị nói quá công dụng (vi phạm chính sách TikTok/Y tế) hoặc làm lệch định vị thương hiệu cao cấp.\n• Key Objectives: (1) Xây dựng mạng lưới 25+ KOC phủ sóng đều đặn; (2) Chuẩn hóa bộ quy tắc truyền thông đảm bảo 100% video đạt chuẩn; (3) Đạt trên 150.000 lượt hiển thị tự nhiên với chi phí tối ưu.",
          "strategy": [
            "Bước 1 – Xây dựng Brand Brief & Quy tắc DO/DON'T: Soạn thảo bộ tài liệu hướng dẫn súc tích: bắt buộc nêu bật công nghệ Nhật Bản khép kín và độ pH chuẩn 8.5–9.0; cấm tuyệt đối các từ ngữ chữa bệnh; hướng dẫn góc máy quay rõ logo và nhãn chai.",
            "Bước 2 – Sàng lọc & Phân tầng KOC: Lọc danh sách KOC có tệp khán giả phù hợp (người yêu thể thao, gia đình trẻ, quan tâm sức khỏe), kiểm tra kỹ tỷ lệ tương tác thật và chất lượng bình luận trước khi gửi lời mời hợp tác.",
            "Bước 3 – Quản lý Seeding & Duyệt kịch bản: Xây dựng quy trình gửi mẫu sản phẩm, theo dõi tiến độ duyệt kịch bản sơ bộ và lịch đăng bài của từng creator trên Google Sheets.",
            "Bước 4 – Đánh giá chuyển đổi & Tối ưu hoa hồng: Đo lường lượt xem, click vào giỏ hàng và đơn hàng phát sinh từ từng video; chọn lọc các video xuất sắc nhất để hợp tác dài hạn và cấp mã chạy TikTok Spark Ads."
          ],
          "results": [
            {
              "val": "151.550",
              "label": "Lượt hiển thị (Impressions)"
            },
            {
              "val": "65.237",
              "label": "Lượt tiếp cận tự nhiên (Organic Reach)"
            },
            {
              "val": "28",
              "label": "Video KOC chất lượng cao"
            },
            {
              "val": "+629",
              "label": "Followers mới đổ về kênh"
            }
          ],
          "learnings": [
            "Một bản Content Brief rõ ràng, tôn trọng phong cách sáng tạo cá nhân của KOC là chìa khóa để video tự nhiên, cuốn hút mà vẫn truyền tải đúng giá trị thương hiệu.",
            "Bước tiếp theo: Thiết lập cơ chế thưởng bậc thang (Tier Commission) dựa trên GMV thực tế để khuyến khích các KOC hàng đầu duy trì tần suất ra video thường xuyên."
          ],
          "tags": [
            "Affiliate Marketing",
            "KOC Seeding",
            "Content Brief",
            "Brand Guideline",
            "TikTok"
          ],
          "desc": "Mở rộng nội dung review đa kênh qua mạng lưới creator affiliate mà vẫn bảo toàn 100% định vị thương hiệu và quy chuẩn y tế.",
          "shortDesc": "Mở rộng nội dung review đa kênh qua mạng lưới creator affiliate mà vẫn bảo toàn 100% định vị thương hiệu và quy chuẩn y tế."
        },
        {
          "id": "fujiwa-speed-launch",
          "category": "growth",
          "title": "Tăng Trưởng Nhận Diện Thương Hiệu Fujiwa & Ra Mắt Dòng Sản Phẩm Mới Fujiwa Speed",
          "client": "Fujiwa Việt Nam",
          "period": "02/2026 – 05/2026",
          "role": "Digital Marketing Executive – Lên chiến lược phân phối nội dung, chạy quảng cáo nhận diện & tương tác cho 2 fanpage mẹ và sản phẩm mới.",
          "image": "assets/images/project_velcity-beverage_cropped_jpg_1790144023829.jpg",
          "heroMetric": "468K Views (+91%) | 200 Triệu doanh thu",
          "highlight": "Tăng độ phủ cho thương hiệu mẹ để hỗ trợ tuyển đại lý, đồng thời ra mắt thành công dòng nước giải khát điện giải mới Fujiwa Speed.",
          "objective": "• Bối cảnh: Fujiwa vừa củng cố uy tín thương hiệu mẹ vừa tung ra dòng thức uống điện giải mới Fujiwa Speed nhắm vào đối tượng người trẻ năng động.\n• Bài toán: Hai mục tiêu khác biệt về tệp khách hàng: một bên cần sự uy tín, quy mô để tuyển sỉ; một bên cần sự trẻ trung, bắt trend để kích thích dùng thử.\n• Key Objectives: (1) Tăng độ nhận diện fanpage mẹ > 50% để tạo niềm tin cho đại lý; (2) Xây dựng cộng đồng fanpage mới Fujiwa Speed đạt 3.000 followers trong 2 tháng; (3) Tạo lực đẩy ban đầu để đạt doanh số 200 triệu VNĐ ngay tháng đầu mở bán.",
          "strategy": [
            "Bước 1 – Định vị thông điệp & Phân tách kênh: Fanpage mẹ 'Fujiwa Việt Nam' tập trung vào quy mô nhà máy công nghệ Nhật Bản và chính sách đại lý; Fanpage 'Fujiwa Speed' xây dựng hình ảnh cá tính, tràn đầy năng lượng gắn liền với thể thao.",
            "Bước 2 – Chiến dịch kích hoạt 'Bật Speed – Reset Vibe': Triển khai tuyến nội dung ngắn bắt trend thể thao, minigame tương tác và thông điệp bổ sung khoáng bù nước tức thì khi vận động mạnh.",
            "Bước 3 – Phân phối Paid Ads Meta tối ưu chi phí: Chạy chiến dịch tối ưu lượt hiển thị (Reach & Video Views) nhắm vào tệp 18–32 tuổi tại TP.HCM và các đô thị lớn có thói quen tập gym, chạy bộ, thể thao.",
            "Bước 4 – Gắn phễu chuyển đổi về kênh bán: Lồng ghép khéo léo thông điệp tuyển đại lý vào các bài viết uy tín của fanpage mẹ; gắn link điều hướng mua hàng trực tuyến và danh sách điểm bán gần nhất trên fanpage Fujiwa Speed."
          ],
          "results": [
            {
              "val": "468.200",
              "label": "Lượt xem fanpage mẹ (+91,2%)"
            },
            {
              "val": "158.800",
              "label": "Unique users tiếp cận (+72%)"
            },
            {
              "val": "3.000+",
              "label": "Followers mới Fujiwa Speed (2 tháng)"
            },
            {
              "val": "200 Triệu",
              "label": "Doanh thu tháng đầu ra mắt"
            }
          ],
          "learnings": [
            "Phân tách rõ ràng KPI và phong cách nội dung giữa trang thương hiệu mẹ và trang sản phẩm nhánh giúp thông điệp không bị đá nhau, tối đa hóa hiệu quả trên từng đồng chi phí quảng cáo.",
            "Bước tiếp theo: Mở rộng hợp tác tài trợ các câu lạc bộ thể thao học đường và giải chạy phong trào để đưa sản phẩm trực tiếp đến tay người tiêu dùng mục tiêu."
          ],
          "tags": [
            "Growth Branding",
            "Meta Ads",
            "Product Launch",
            "Content Strategy"
          ],
          "desc": "Tăng độ phủ cho thương hiệu mẹ để hỗ trợ tuyển đại lý, đồng thời ra mắt thành công dòng nước giải khát điện giải mới Fujiwa Speed.",
          "shortDesc": "Tăng độ phủ cho thương hiệu mẹ để hỗ trợ tuyển đại lý, đồng thời ra mắt thành công dòng nước giải khát điện giải mới Fujiwa Speed."
        },
        {
          "id": "content-seo",
          "category": "content",
          "title": "SEO Content B2B Cho Bếp Công Nghiệp Toàn Phát & Bản Tin Thị Trường Worldline",
          "client": "Toàn Phát · Worldline Technology",
          "period": "10/2024 – 04/2025 & Freelance",
          "role": "SEO & Content Marketing – Nghiên cứu từ khóa theo Search Intent, xây dựng Content Plan, viết bài chuẩn On-page và biên tập bản tin thị trường.",
          "image": "assets/images/case-content-seo.jpg",
          "heroMetric": "Top SEO On-page | Market Intelligence",
          "highlight": "Chiến lược nội dung tiếp cận khách hàng B2B theo đúng ý định tìm kiếm (Search Intent) và cô đọng báo cáo dữ liệu thị trường vĩ mô.",
          "objective": "• Bối cảnh: Với Toàn Phát (thiết bị bếp công nghiệp giá trị cao), khách hàng là chủ nhà hàng, khách sạn cần tìm hiểu kỹ thông số kỹ thuật trước khi gọi tư vấn. Với Worldline, cần biến các báo cáo xuất nhập khẩu vĩ mô khô khan thành bài viết ngắn gọn, giàu giá trị cho cộng đồng doanh nghiệp.\n• Bài toán: Làm sao để bài viết vừa chuẩn kỹ thuật SEO lên top Google, vừa có văn phong chuyên môn thuyết phục được người làm kinh doanh thực tế.\n• Key Objectives: (1) Khai thác trọn vẹn 4 nhóm Search Intent của khách mua hàng B2B; (2) Tối ưu on-page 100% bài viết gắn liền với CTA chuyển đổi; (3) Biên soạn các bản tin thị trường đạt độ chính xác dữ liệu cao.",
          "strategy": [
            "Bước 1 – Nghiên cứu từ khóa theo Search Intent B2B: Phân loại từ khóa theo hành trình mua: Nhóm So sánh giải pháp (bếp gas vs bếp từ công nghiệp), Nhóm Tư vấn công suất (chọn nồi nấu bao nhiêu lít theo quy mô khách), Nhóm Hướng dẫn sử dụng & bảo trì, và Nhóm Báo giá sản phẩm.",
            "Bước 2 – Xây dựng Topic Cluster theo dòng sản phẩm: Lên kế hoạch nội dung có cấu trúc liên kết nội bộ (Internal Links) chặt chẽ quanh các nhóm thiết bị chủ lực (tủ nấu cơm công nghiệp, máy giặt công nghiệp, lò nướng đa năng) để nâng cao thẩm quyền trang.",
            "Bước 3 – Viết bài chuẩn On-page & Tối ưu chuyển đổi: Tối ưu thẻ tiêu đề, Heading H2/H3, mật độ từ khóa tự nhiên; bổ sung bảng thông số kỹ thuật trực quan và chèn ảnh thực tế chụp tại showroom kèm hotline tư vấn.",
            "Bước 4 – Chắt lọc số liệu thị trường (Worldline): Trích xuất các dữ liệu quan trọng về kim ngạch xuất nhập khẩu cà phê, hạt điều, nông sản sang EU; trình bày dưới dạng bài viết ngắn có bullet point rõ ràng, dễ nắm bắt."
          ],
          "results": [
            {
              "val": "8+",
              "label": "Bài viết SEO chuyên sâu lên top"
            },
            {
              "val": "4",
              "label": "Nhóm Search Intent được phủ kín"
            },
            {
              "val": "4+",
              "label": "Bản tin Vietnam Market Report"
            },
            {
              "val": "100%",
              "label": "Bài viết gắn CTA điều hướng tư vấn"
            }
          ],
          "learnings": [
            "Trong ngành B2B thiết bị, nội dung giải đáp đúng bài toán kỹ thuật và chi phí vận hành sẽ xây dựng niềm tin vững chắc, biến người đọc thành khách hàng tiềm năng mà không tốn chi phí ads.",
            "Bước tiếp theo: Tích hợp thêm các video ngắn vận hành thực tế tại showroom vào bài viết để nâng cao thời gian giữ chân (Time-on-page) và tỷ lệ gửi yêu cầu báo giá."
          ],
          "tags": [
            "SEO Content",
            "Search Intent",
            "Topic Cluster",
            "On-page SEO",
            "B2B Copywriting"
          ],
          "desc": "Chiến lược nội dung tiếp cận khách hàng B2B theo đúng ý định tìm kiếm (Search Intent) và cô đọng báo cáo dữ liệu thị trường vĩ mô.",
          "shortDesc": "Chiến lược nội dung tiếp cận khách hàng B2B theo đúng ý định tìm kiếm (Search Intent) và cô đọng báo cáo dữ liệu thị trường vĩ mô."
        }
      ]
    },
    "skills": {
      "tag": "CÔNG CỤ & KỸ NĂNG CHUYÊN MÔN",
      "title": "Kỹ Năng & Công Cụ Thực Chiến",
      "subtitle": "Các nền tảng, công cụ và phương pháp luận mình sử dụng hàng ngày để vận hành chiến dịch.",
      "groups": [
        {
          "title": "Paid Media & Performance",
          "icon": "ri-line-chart-line",
          "skills": [
            {
              "name": "Meta Ads (Lead Form, Messenger, Retargeting, CAPI)",
              "icon": "ri-meta-line"
            },
            {
              "name": "TikTok Shop – GMV Max & Live GMV Max",
              "icon": "ri-tiktok-line"
            },
            {
              "name": "Geo-targeting, Blank Targeting & A/B Testing",
              "icon": "ri-map-pin-range-line"
            },
            {
              "name": "Kiểm soát ngân sách, CPL/CAC & Tối ưu ROAS",
              "icon": "ri-funds-line"
            },
            {
              "name": "Pixel, Tracking Funnel & Custom Audiences",
              "icon": "ri-radar-line"
            }
          ]
        },
        {
          "title": "E-commerce & KOC Marketing",
          "icon": "ri-store-2-line",
          "skills": [
            {
              "name": "Phễu Lead B2B: MQL → SQL → Close-won",
              "icon": "ri-filter-3-line"
            },
            {
              "name": "Quản lý mạng lưới KOC & Affiliate TikTok",
              "icon": "ri-team-line"
            },
            {
              "name": "Content Briefing Guideline & Brand DO/DON'T",
              "icon": "ri-file-list-3-line"
            },
            {
              "name": "Tối ưu Storefront Mall, SEO Listing & Thumbnail",
              "icon": "ri-shopping-bag-3-line"
            },
            {
              "name": "SEO On-page & Copywriting chuyển đổi",
              "icon": "ri-article-line"
            }
          ]
        },
        {
          "title": "Data, Reporting & AI",
          "icon": "ri-cpu-line",
          "skills": [
            {
              "name": "Custom Dashboard KPI (Google Sheets & Claude AI)",
              "icon": "ri-dashboard-3-line"
            },
            {
              "name": "Meta Ads Manager & Business Suite Insights",
              "icon": "ri-bar-chart-box-line"
            },
            {
              "name": "TikTok Shop Seller Analytics & GMV Tracking",
              "icon": "ri-pie-chart-2-line"
            },
            {
              "name": "Nghiên cứu thị trường & Chân dung khách hàng",
              "icon": "ri-user-search-line"
            },
            {
              "name": "Prompt Engineering ứng dụng phân tích dữ liệu",
              "icon": "ri-robot-2-line"
            }
          ]
        }
      ]
    },
    "journey": {
      "tag": "KINH NGHIỆM LÀM VIỆC",
      "title": "Hành Trình Sự Nghiệp & Kinh Nghiệm",
      "subtitle": "Các vị trí thực tế và trách nhiệm chính mình đã đảm nhận.",
      "timeline": [
        {
          "year": "02/2026 – 05/2026",
          "role": "Digital Marketing Executive",
          "company": "Fujiwa Việt Nam",
          "desc": "Quản lý ngân sách gần 200 triệu cho Meta Ads tuyển đại lý B2B (CPL < 130K, 53 đại lý chốt); vận hành TikTok Shop GMV Max (ROI 10.6x), điều phối mạng lưới 28+ KOC/Affiliate và chiến dịch ra mắt Fujiwa Speed."
        },
        {
          "year": "05/2025 – 01/2026",
          "role": "Performance Marketing",
          "company": "Agrizen",
          "desc": "Nghiên cứu thị trường và triển khai quảng cáo Meta Ads thâm nhập nông nghiệp Tây Nguyên & Miền Tây: Tạo ra 1.223 MQLs, tỉ lệ chốt đơn qua Messenger đạt 34,42%, doanh thu tháng đỉnh điểm đạt 1,2 tỷ VNĐ."
        },
        {
          "year": "10/2024 – 04/2025",
          "role": "Content Marketing",
          "company": "Worldline Technology",
          "desc": "Phân tích số liệu vĩ mô và biên soạn các bản tin thị trường chuyên sâu cho cộng đồng Vietnam Market Report; tóm tắt dữ liệu xuất nhập khẩu phức tạp thành các bài viết trực quan."
        },
        {
          "year": "Freelance",
          "role": "SEO Content Writer",
          "company": "Bếp công nghiệp Toàn Phát",
          "desc": "Nghiên cứu từ khóa theo Search Intent khách hàng B2B, lập Content Plan và viết bài SEO On-page chuyên sâu cho các dòng thiết bị bếp nhà hàng, khách sạn."
        }
      ]
    },
    "contact": {
      "tag": "KẾT NỐI & HỢP TÁC",
      "title": "Cùng Tạo Nên Đột Phá Mới",
      "subtitle": "Bạn đang tìm kiếm một nhân sự Digital Marketing thực chiến, hay muốn trao đổi về dự án tăng trưởng doanh thu? Hãy kết nối với mình!",
      "infoTitle": "Thông tin liên hệ trực tiếp",
      "email": "leducviet038@gmail.com",
      "phone": "0932 478 949",
      "location": "Hồ Chí Minh / Remote",
      "socials": [
        {
          "name": "LinkedIn",
          "url": "https://www.linkedin.com/in/viet-le-duc-64a167353/",
          "icon": "ri-linkedin-box-fill"
        }
      ],
      "formName": "Họ và tên của bạn",
      "formEmail": "Địa chỉ Email",
      "formPhone": "Số điện thoại",
      "formService": "Hạng mục quan tâm",
      "formServiceOpts": [
        "Vận hành Paid Ads & Tối ưu ROAS (Meta, TikTok)",
        "Xây dựng phễu Lead Gen B2B & Tuyển đại lý",
        "Vận hành TikTok Shop & KOC Affiliate",
        "Cơ hội việc làm Full-time / Dự án dài hạn"
      ],
      "formMessage": "Chia sẻ ngắn về dự án hoặc vị trí tuyển dụng",
      "btnSubmit": "Gửi Tin Nhắn",
      "btnSending": "Đang gửi đi...",
      "successMsg": "Ứng dụng email của bạn đã mở với nội dung soạn sẵn – chỉ cần bấm Gửi. Nếu không thấy, hãy email trực tiếp tới leducviet038@gmail.com."
    },
    "footer": {
      "copyright": "© 2026 Lê Đức Việt. All rights reserved. Crafted with passion & modern web technologies.",
      "backToTop": "Lên đầu trang"
    },
    "modal": {
      "challengeTitle": "Key Objectives & Bối Cảnh Bài Toán",
      "strategyTitle": "Execution Steps (Các Bước Triển Khai)",
      "resultsTitle": "Key Achievements (Kết Quả Đo Lường)",
      "closeBtn": "Đóng cửa sổ",
      "roleTitle": "Vai trò & Phạm vi phụ trách",
      "periodTitle": "Thời gian triển khai",
      "learningsTitle": "Key Takeaways & Hướng Tối Ưu"
    }
  },
  "en": {
    "nav": {
      "about": "About",
      "services": "Core Competencies",
      "projects": "Case Studies",
      "skills": "Skills",
      "journey": "Experience",
      "contact": "Contact",
      "cta": "Resume"
    },
    "hero": {
      "badge": "Open for Full-time Roles & Strategic Projects",
      "greeting": "Hello, I am",
      "name": "Le Duc Viet",
      "role": "Digital Marketing Executive",
      "subRole": "Performance & Growth Marketing | 2+ YOE",
      "bio": "Performance-driven Digital Marketing Executive with 2+ years of hands-on experience scaling Paid Ads (Meta, TikTok Shop GMV Max), building closed-loop B2B lead funnels, and managing KOC/Affiliate networks. Laser-focused on lowering CPL/CAC, boosting ROAS, and driving measurable revenue.",
      "btnProjects": "View Case Studies",
      "btnContact": "Get In Touch",
      "stats": [
        {
          "value": 1500,
          "suffix": "+",
          "label": "Marketing Qualified Leads (MQLs)"
        },
        {
          "value": 53,
          "suffix": "",
          "label": "Closed B2B Dealers & Distributors"
        },
        {
          "value": 34,
          "suffix": "%",
          "label": "Messenger Chat Close Rate"
        },
        {
          "value": 10,
          "suffix": "x+",
          "label": "TikTok Shop GMV Max ROI"
        }
      ],
      "avatar": "assets/images/intern_Marketing__2__cropped_jpg_1791365154973.jpg"
    },
    "about": {
      "tag": "ABOUT & WORK ETHIC",
      "title": "Laser-focused on Measurable Impact, Cost Efficiency & Real Revenue",
      "desc1": "Hi, I'm Viet. I approach Digital Marketing with a no-nonsense, performance-first mindset: every advertising dollar spent must translate into measurable return — whether qualified B2B dealer leads, profitable TikTok Shop orders, or direct bottom-line revenue.",
      "desc2": "I execute hands-on across every step: from market & customer persona research, ad account architecture, and creator briefing guidelines, to building automated AI/Google Sheets dashboards tracking daily CPL, CTR, and ROAS. No vanity metrics, no guesswork.",
      "coreValues": [
        {
          "title": "End-to-End Funnel Attribution",
          "desc": "Never stopping at cheap CPL or superficial reach. I collaborate directly with Sales to audit MQLs, SQLs, and actual close-won contracts."
        },
        {
          "title": "Cost Discipline & Continuous A/B Testing",
          "desc": "Rigorous budget allocation by geo-target, continuously iterating creative hooks and audiences to sustain positive ROAS."
        },
        {
          "title": "Conversion-Driven Content & Briefing",
          "desc": "Standardizing DO/DON'T briefs for KOCs and affiliates, focusing on first-3s hooks and real customer pain points that convert."
        }
      ]
    },
    "services": {
      "tag": "CORE COMPETENCIES",
      "title": "Core Competencies & Hands-on Expertise",
      "subtitle": "Specialized domains I actively manage, optimize, and drive measurable performance.",
      "items": [
        {
          "id": "performance-ads",
          "icon": "ri-line-chart-line",
          "title": "Performance Marketing & ROAS",
          "desc": "Setting up, A/B testing, and scaling Meta Ads (Lead Gen, Messenger, Retargeting) & TikTok Shop GMV Max with disciplined CPL and positive ROAS.",
          "deliverables": [
            "Meta Ads: B2B Lead Gen, Messenger & Retargeting",
            "TikTok Shop: GMV Max & Live GMV Max",
            "A/B creative testing, hook testing & scaling"
          ]
        },
        {
          "id": "b2b-leadgen",
          "icon": "ri-filter-3-line",
          "title": "B2B Lead Generation & Funnel Architecture",
          "desc": "Designing conversion funnels from cold ad impression to signed dealership contract; tiering MQL/SQL and reconciling closely with Sales.",
          "deliverables": [
            "4-Tier funnel model: Lead → IQL → MQL → Close-won",
            "Messaging scripts & intake lead forms",
            "Pipeline status reporting & sales conversion rate"
          ]
        },
        {
          "id": "ecommerce-ops",
          "icon": "ri-shopping-bag-3-line",
          "title": "E-commerce & TikTok Shop Operations",
          "desc": "Optimizing TikTok Shop Mall storefronts, search intent listing SEO, high-CTR thumbnails, and multi-SKU bundle pricing to maximize AOV.",
          "deliverables": [
            "Mall storefront & thumbnail CRO optimization",
            "Listing SEO & buyer search intent research",
            "Combo SKU packaging & Live Flash Sale bidding"
          ]
        },
        {
          "id": "koc-affiliate",
          "icon": "ri-team-line",
          "title": "KOC & Affiliate Management",
          "desc": "Establishing Brand Briefing Guidelines (DO/DON'T), vetting niche-relevant KOCs, product sample seeding, and scaling winning creator videos.",
          "deliverables": [
            "Standardized content briefs & DO/DON'T guidelines",
            "Audience screening, sample seeding & delivery tracking",
            "Affiliate commission tiers & Spark Ads whitelisting"
          ]
        }
      ]
    },
    "projects": {
      "tag": "CASE STUDIES & MEASURED IMPACT",
      "title": "Featured Case Studies",
      "subtitle": "Deep dive into 6 real campaigns: Key Objectives, Execution Steps, Measurable Achievements, and Key Takeaways.",
      "filterAll": "All",
      "filterCategories": {
        "performance": "Performance & Lead Gen",
        "ecommerce": "TikTok Shop & E-com",
        "planning": "Market Planning",
        "affiliate": "KOC & Affiliate",
        "growth": "Brand Growth",
        "content": "SEO & Content"
      },
      "viewDetail": "View Full Case Study",
      "list": [
        {
          "id": "fujiwa-dealer-leadgen",
          "category": "performance",
          "title": "Nationwide Dealer & Distributor Recruitment for Fujiwa via a B2B Lead Funnel",
          "client": "Fujiwa Vietnam",
          "period": "02/2026 – 05/2026",
          "role": "Digital Marketing Executive – Planning, setup & Meta Ads optimization, collaborating with Sales Admin on pipeline tracking, and building custom KPI dashboards.",
          "image": "assets/images/case-fujiwa-dealer-leadgen.jpg",
          "heroMetric": "CPL < 130K | 53 Closed Dealers",
          "highlight": "Engineered an end-to-end B2B lead generation funnel from Meta Ads to signed nationwide distributor contracts at CPL < 130K with 53 closed partnerships.",
          "objective": "• Context: Fujiwa needed to expand its nationwide dealer and distributor network for premium alkaline ionized water with an ad budget of ~200M VND.\n• Challenge: Target audience consists of dealership owners, grocery store proprietors, and pharmacy owners — small niche pool, long consideration cycle, requiring transparent commercial margins.\n• Key Objectives: (1) Keep CPL strictly below 150,000 VND; (2) Generate 600+ high-intent dealer leads; (3) Measure closed-loop attribution down to signed contracts (Close-won), avoiding vanity chat inquiries.",
          "strategy": [
            "Step 1 – Geo-Targeting & Blank Adsets: Segmented campaigns across priority regional markets (South, Mekong Delta, Central Highlands) running alongside broad Blank targeting for Meta algorithms to locate prospective business owners; aggressively reallocated budget to lowest-cost lead zones.",
            "Step 2 – Commercial Offer & Creative Packaging: Collaborated with Design and Sales Admin to structure attractive wholesale packages (tiered margins, POSM display signage support, regional exclusive perks) as core ad hooks.",
            "Step 3 – 4-Tier Qualification Funnel: Built a structured pipeline: Messenger Chat → Information Qualified Lead (IQL - verified phone/location) → Marketing Qualified Lead (MQL - meets capital/premises criteria) → Close-Won (signed contract).",
            "Step 4 – Real-Time KPI Dashboard & Sales Sync: Built a custom AI dashboard tracking daily CPL/CTR/MQL metrics; conducted weekly audit reviews with Sales Admin to weed out unresponsive leads and scale winning ad sets."
          ],
          "results": [
            {
              "val": "758",
              "label": "Inbound Prospective Dealer Leads"
            },
            {
              "val": "< 130K",
              "label": "Cost Per Lead (VND)"
            },
            {
              "val": "312",
              "label": "Marketing Qualified Leads (MQL)"
            },
            {
              "val": "53",
              "label": "Signed Dealers & Distributors"
            }
          ],
          "learnings": [
            "In B2B lead generation, lead quality (MQL and Close-won) matters far more than cheap raw CPL. Aligning ad optimization with sales close data prevents budget waste on unqualified curiosity clicks.",
            "Next Steps: Integrate Meta Conversions API (CAPI) to feed CRM offline contract data back to Meta for automated lookalike learning on actual verified business buyers."
          ],
          "tags": [
            "Meta Ads",
            "B2B Lead Gen",
            "Geo-targeting",
            "A/B Testing",
            "Sales Pipeline"
          ],
          "desc": "Engineered an end-to-end B2B lead generation funnel from Meta Ads to signed nationwide distributor contracts at CPL < 130K with 53 closed partnerships.",
          "shortDesc": "Engineered an end-to-end B2B lead generation funnel from Meta Ads to signed nationwide distributor contracts at CPL < 130K with 53 closed partnerships."
        },
        {
          "id": "agrizen-market-entry",
          "category": "planning",
          "title": "Bio-Organic Fertilizer Market Entry in Central Highlands & Mekong Delta",
          "client": "Agrizen – Bio-Organic Microbe Fertilizer",
          "period": "05/2025 – 01/2026",
          "role": "Performance Marketing – Market research, buyer persona profiling, budget allocation, and Meta Ads management (Messenger, Video Views, Retargeting).",
          "image": "assets/images/case-agrizen-market-planning.jpg",
          "heroMetric": "1.2B Peak Rev | CIR 37.86%",
          "highlight": "Niche market entry strategy against corporate legacy giants: Pinpoint regional focus, verifiable USP, and a Messenger conversion funnel delivering 34.4% close rate.",
          "objective": "• Context: Established legacy fertilizers (Phu My, Ca Mau, Con Co) dominated traditional dealer shelves, while widespread counterfeit organic products on social media severely undermined farmer trust.\n• Challenge: As an emerging brand with a focused budget, Agrizen could not afford untargeted nationwide blanket ads.\n• Key Objectives: (1) Successfully penetrate 2 strategic agricultural niches; (2) Maintain CIR (Cost-to-Income Ratio) below 40%; (3) Achieve a Messenger consultation close rate > 30% with high seasonal retention.",
          "strategy": [
            "Step 1 – Regional Selection & Niche USP: Prioritized Central Highlands (durian, coffee) and Mekong Delta (fruit orchards, saline soil) where soil recovery was critical. Positioned clear USP: High-concentration bio-organic soil detox with verifiable testing certifications and QR traceability.",
            "Step 2 – Authentic Video Views Warming Funnel: Produced unpolished, real-world farm walkthrough videos, qualifying viewers who watched > 50% duration as genuine orchard owners suffering yellow-leaf and root-rot issues.",
            "Step 3 – Retargeting & Direct Messenger Closing: Allocated 25–30% of budget to retarget video viewers via Messenger chat ads, deploying tailored agronomic consultation scripts for specific crop diseases to overcome counterfeit skepticism.",
            "Step 4 – Seasonal Re-engagement: Designed a seasonal calendar tracking customer harvest cycles, enabling automated reminders for fertilizing schedules and driving repeat bulk re-orders."
          ],
          "results": [
            {
              "val": "1,223",
              "label": "Marketing Qualified Leads (MQL)"
            },
            {
              "val": "423",
              "label": "Closed Messenger Orders"
            },
            {
              "val": "34.42%",
              "label": "Messenger Close Rate"
            },
            {
              "val": "60.98%",
              "label": "Customer Retention Rate"
            }
          ],
          "learnings": [
            "In agriculture marketing, authentic proof (field trials, official test certs, peer farmer video testimonials) converts significantly higher than slick corporate animations.",
            "A ~61% retention rate validates outstanding Lifetime Value (LTV); next step is deploying Zalo ZNS / Mini App automation for seasonal crop-cycle reordering."
          ],
          "tags": [
            "Market Planning",
            "Meta Ads",
            "Messenger Funnel",
            "Retargeting",
            "Agriculture Marketing"
          ],
          "desc": "Niche market entry strategy against corporate legacy giants: Pinpoint regional focus, verifiable USP, and a Messenger conversion funnel delivering 34.4% close rate.",
          "shortDesc": "Niche market entry strategy against corporate legacy giants: Pinpoint regional focus, verifiable USP, and a Messenger conversion funnel delivering 34.4% close rate."
        },
        {
          "id": "fujiwa-tiktok-shop",
          "category": "ecommerce",
          "title": "TikTok Shop Mall Storefront & GMV Max Optimization for Fujiwa Alkaline Water",
          "client": "Fujiwa Vietnam",
          "period": "02/2026 – 05/2026",
          "role": "E-commerce & Ads Specialist – GMV Max & Live GMV Max ad management, Mall storefront optimization, listing SEO, and thumbnail CRO.",
          "image": "assets/images/case-fujiwa-tiktok-shop.jpg",
          "heroMetric": "GMV Max ROI 10.6x | Live ROI 30x+",
          "highlight": "Combined algorithmic GMV Max ad management with on-page store optimization (Storefront, SEO, combo SKU architecture) to sustain 10x+ ROI.",
          "objective": "• Context: Fujiwa expanded direct-to-consumer e-commerce on TikTok Shop Mall for bottled water, portable gallons, and alkaline mouthwash.\n• Challenge: Bottled water is a fiercely contested category with low basket sizes and heavy shipping logistics costs.\n• Key Objectives: (1) Sustain healthy positive ad ROI (> 6x); (2) Elevate Average Order Value (AOV) via multi-item combo packaging; (3) Maximize revenue capture during Mega Live events with controlled acquisition cost per order.",
          "strategy": [
            "Step 1 – Storefront Mall Optimization & CTR Thumbnails: Overhauled homepage navigation banners, categorized product shelves, and designed Mall-compliant thumbnails emphasizing exclusive vouchers and free gifts to elevate CTR.",
            "Step 2 – Search Intent Listing SEO: Structured product titles and descriptions targeting high-intent buyer searches (alkaline mineral water, electrolyte hydration, bulk office water) to capture free organic discovery traffic.",
            "Step 3 – Multi-SKU Combo Architecture: Bundled high-volume items (Carton 450ml + 1.25L bottle + Alkaline mouthwash) to boost basket size (AOV) and absorb shipping subsidies profitably.",
            "Step 4 – Live GMV Max Bidding Strategy: Set high target ROI bids with capped spend early in livestream sessions to let algorithms discover qualified buyers; dynamically lowered target ROI during peak traffic surges to maximize order volume. Maintained daily GMV Max alongside creator affiliate videos."
          ],
          "results": [
            {
              "val": "10.6x",
              "label": "GMV Max ROI (Apr 2026)"
            },
            {
              "val": "43.8M",
              "label": "Monthly GMV Max Revenue (VND)"
            },
            {
              "val": "~19,900đ",
              "label": "Ad Cost Per Completed Order"
            },
            {
              "val": "30x+",
              "label": "Live GMV Max Mega Sale ROI"
            }
          ],
          "learnings": [
            "Smart bundle packaging and clean e-commerce thumbnails drive CTR and AOV far more effectively than merely pumping up ad spend.",
            "Next Steps: Track Blended ROAS (Total Shop GMV divided by Total Ad Spend) to evaluate the halo effect of paid ads on organic storefront traffic."
          ],
          "tags": [
            "TikTok Shop",
            "GMV Max",
            "Live GMV Max",
            "Storefront CRO",
            "Combo SKU"
          ],
          "desc": "Combined algorithmic GMV Max ad management with on-page store optimization (Storefront, SEO, combo SKU architecture) to sustain 10x+ ROI.",
          "shortDesc": "Combined algorithmic GMV Max ad management with on-page store optimization (Storefront, SEO, combo SKU architecture) to sustain 10x+ ROI."
        },
        {
          "id": "fujiwa-affiliate-koc",
          "category": "affiliate",
          "title": "Scaling Fujiwa's Creator Affiliate & KOC Network with Standardized Briefs",
          "client": "Fujiwa Vietnam",
          "period": "02/2026 – 05/2026",
          "role": "KOC / Affiliate Specialist – Creator sourcing & screening, sample seeding operations, brand brief guidelines, and message compliance auditing.",
          "image": "assets/images/case-fujiwa-affiliate.jpg",
          "heroMetric": "151K+ Views | 28 Vetted Videos",
          "highlight": "Multiplied creator-generated showcase reviews across TikTok while safeguarding 100% brand equity positioning and healthcare policy compliance.",
          "objective": "• Context: Fujiwa needed to multiply user-generated review videos and TikTok Shop showcase attachments without inflating in-house production overhead.\n• Challenge: Uncontrolled creator freedom easily leads to medical over-claiming (violating TikTok/healthcare ad policies) or diluting premium Japanese brand standards.\n• Key Objectives: (1) Recruit 25+ qualified lifestyle/health KOCs; (2) Enforce strict compliance guidelines across 100% of published videos; (3) Generate 150,000+ organic views cost-efficiently.",
          "strategy": [
            "Step 1 – Brand Brief & DO/DON'T Guideline: Published a standardized creator briefing kit: mandatory Japanese closed-loop technology messaging, stable pH 8.5–9.0 facts, zero medical claims, and clear packaging angle framing.",
            "Step 2 – KOC Vetting & Audience Filtering: Screened creators by audience demographics (fitness, young families, wellness enthusiasts), auditing authentic engagement ratios and comment quality prior to sample seeding.",
            "Step 3 – Sample Seeding & Script Pipeline: Managed product dispatch workflows, tracked pre-publish script reviews, and monitored upload schedules via real-time tracking sheets.",
            "Step 4 – Performance Auditing & Spark Ads Scaling: Analyzed views, cart click-throughs, and affiliate GMV; whitelisted top-performing videos for TikTok Spark Ads amplification and long-term retainer partnerships."
          ],
          "results": [
            {
              "val": "151,550",
              "label": "Total Impressions (2 Months)"
            },
            {
              "val": "65,237",
              "label": "Organic Reach"
            },
            {
              "val": "28",
              "label": "High-Quality Vetted Videos"
            },
            {
              "val": "+629",
              "label": "New Channel Followers"
            }
          ],
          "learnings": [
            "A clear, punchy brief that respects creator voice is the foundation of high-converting content that protects brand equity.",
            "Next Steps: Implement tiered performance bonus commissions based on verified GMV to motivate top-converting KOCs to produce recurring series."
          ],
          "tags": [
            "Affiliate Marketing",
            "KOC Seeding",
            "Content Brief",
            "Brand Guideline",
            "TikTok"
          ],
          "desc": "Multiplied creator-generated showcase reviews across TikTok while safeguarding 100% brand equity positioning and healthcare policy compliance.",
          "shortDesc": "Multiplied creator-generated showcase reviews across TikTok while safeguarding 100% brand equity positioning and healthcare policy compliance."
        },
        {
          "id": "fujiwa-speed-launch",
          "category": "growth",
          "title": "Fujiwa Brand Equity Growth & Product Launch for Fujiwa Speed Electrolyte",
          "client": "Fujiwa Vietnam",
          "period": "02/2026 – 05/2026",
          "role": "Digital Marketing Executive – Content distribution strategy, brand awareness & engagement ad management across mother and sub-brand channels.",
          "image": "assets/images/project_velcity-beverage_cropped_jpg_1790144023829.jpg",
          "heroMetric": "468K Views (+91%) | 200M Revenue",
          "highlight": "Amplified mother brand corporate reach to validate dealer trust, while successfully orchestrating the market debut of Fujiwa Speed hydration.",
          "objective": "• Context: Fujiwa launched its new electrolyte hydration line 'Fujiwa Speed' targeted at active youth, while concurrently scaling mother brand awareness to bolster dealer recruitment.\n• Challenge: Balancing two distinct audiences: building corporate credibility for prospective wholesale dealers versus dynamic, trend-driven lifestyle appeal for sports consumers.\n• Key Objectives: (1) Elevate mother brand page reach > 50% to build dealer confidence; (2) Grow the dedicated Fujiwa Speed page to 3,000 followers in 2 months; (3) Achieve 200M VND in product launch month sales.",
          "strategy": [
            "Step 1 – Dual-Channel Brand Segmentation: Positioned parent page 'Fujiwa Vietnam' around factory scale, Japanese technology, and dealer perks; positioned 'Fujiwa Speed' around vibrant sports culture, fitness, and vitality.",
            "Step 2 – Activation Campaign 'Power Speed – Reset Vibe': Rolled out short-form athletic workout reels, interactive engagement minigames, and instant mineral replenishment messaging.",
            "Step 3 – Targeted Paid Social Distribution: Deployed Meta reach and video view ad sets targeting active 18–32 demographics in major metropolitan centers engaged in running, gym, and sports.",
            "Step 4 – Integrated Point-of-Sale Funnel: Integrated dealer inquiry calls-to-action into corporate brand posts; directed young consumers to e-commerce storefronts and nearby retail partners via bio links."
          ],
          "results": [
            {
              "val": "468,200",
              "label": "Mother Page Views (+91.2% YoY)"
            },
            {
              "val": "158,800",
              "label": "Unique Users Reached (+72%)"
            },
            {
              "val": "3,000+",
              "label": "Fujiwa Speed Page Followers (2 Mos)"
            },
            {
              "val": "200M",
              "label": "Launch Month Revenue (VND)"
            }
          ],
          "learnings": [
            "Decoupling channel objectives prevents audience confusion and maximizes return per ad dollar across both B2B and B2C segments.",
            "Next Steps: Sponsor community marathon races and university athletic clubs to convert digital buzz into physical shelf velocity."
          ],
          "tags": [
            "Growth Branding",
            "Meta Ads",
            "Product Launch",
            "Content Strategy"
          ],
          "desc": "Amplified mother brand corporate reach to validate dealer trust, while successfully orchestrating the market debut of Fujiwa Speed hydration.",
          "shortDesc": "Amplified mother brand corporate reach to validate dealer trust, while successfully orchestrating the market debut of Fujiwa Speed hydration."
        },
        {
          "id": "content-seo",
          "category": "content",
          "title": "B2B Commercial SEO Content for Toan Phat & Vietnam Market Report Briefs",
          "client": "Toan Phat · Worldline Technology",
          "period": "10/2024 – 04/2025 & Freelance",
          "role": "SEO & Content Marketing – Search intent keyword research, topic cluster planning, on-page SEO execution, and macroeconomic intelligence editing.",
          "image": "assets/images/case-content-seo.jpg",
          "heroMetric": "Top SEO On-page | Market Intelligence",
          "highlight": "Engineered high-intent search acquisition for commercial kitchen equipment and synthesized macro trade data into actionable business intelligence.",
          "objective": "• Context: Toan Phat (commercial kitchen appliances) required high-ticket organic buyer acquisition from Google. Worldline Technology required distilling complex trade statistics into punchy industry briefs for the Vietnam Market Report community.\n• Challenge: Bridging technical SEO rigors with compelling B2B industry copywriting that convinces pragmatic business owners.\n• Key Objectives: (1) Cover all 4 B2B commercial search intent clusters; (2) Optimize 100% of articles for on-page conversion with direct CTAs; (3) Produce market intelligence briefs with verifiable data.",
          "strategy": [
            "Step 1 – B2B Search Intent Clustering: Categorized target keywords into buying journey stages: Solution Comparison (Gas vs Electric industrial cookers), Capacity Consulting (Sizing commercial soup pots for restaurant volumes), Maintenance Guides, and Direct Quotation inquiries.",
            "Step 2 – Topic Cluster Architecture: Structured interlinked content pillars around flagship commercial machinery (rice cookers, industrial washers, combi ovens) to establish strong domain topical authority.",
            "Step 3 – On-Page SEO & Conversion Layout: Engineered semantic heading hierarchies (H2/H3), technical specification comparison tables, showroom equipment photography, and persistent hotline/consultation banners.",
            "Step 4 – Macro Data Synthesis (Worldline): Extracted critical export-import metrics (coffee, cashew, agriculture to EU), structuring bite-sized bulleted summaries and data charts for business readers."
          ],
          "results": [
            {
              "val": "8+",
              "label": "Top-Ranking SEO Pillar Articles"
            },
            {
              "val": "4",
              "label": "Search Intent Clusters Covered"
            },
            {
              "val": "4+",
              "label": "Market Intelligence Editions"
            },
            {
              "val": "100%",
              "label": "Articles with Inbound Sales CTAs"
            }
          ],
          "learnings": [
            "High-ticket B2B buyers convert when technical questions and operational cost concerns are directly resolved; well-crafted SEO content functions as a permanent, zero-ad-cost lead engine.",
            "Next Steps: Embed video equipment walkthroughs directly onto top articles to increase time-on-page and quote inquiry rates."
          ],
          "tags": [
            "SEO Content",
            "Search Intent",
            "Topic Cluster",
            "On-page SEO",
            "B2B Copywriting"
          ],
          "desc": "Engineered high-intent search acquisition for commercial kitchen equipment and synthesized macro trade data into actionable business intelligence.",
          "shortDesc": "Engineered high-intent search acquisition for commercial kitchen equipment and synthesized macro trade data into actionable business intelligence."
        }
      ]
    },
    "skills": {
      "tag": "SKILLS & TECH STACK",
      "title": "Practical Skillset & Tech Stack",
      "subtitle": "Platforms, software, and execution frameworks I leverage daily to drive campaign outcomes.",
      "groups": [
        {
          "title": "Paid Media & Performance",
          "icon": "ri-line-chart-line",
          "skills": [
            {
              "name": "Meta Ads Manager (Lead Gen, Messenger, Retargeting, CAPI)",
              "icon": "ri-meta-line"
            },
            {
              "name": "TikTok Shop Seller Center – GMV Max & Live GMV Max",
              "icon": "ri-tiktok-line"
            },
            {
              "name": "Geo-targeting, Broad Blank Targeting & A/B Testing",
              "icon": "ri-map-pin-range-line"
            },
            {
              "name": "Budget Pacing, CPL/CAC Control & ROAS Scaling",
              "icon": "ri-funds-line"
            },
            {
              "name": "Tracking Architecture: Pixels, Funnels & Custom Audiences",
              "icon": "ri-radar-line"
            }
          ]
        },
        {
          "title": "E-commerce & KOC Marketing",
          "icon": "ri-store-2-line",
          "skills": [
            {
              "name": "B2B Lead Funnels: MQL → SQL → Close-won",
              "icon": "ri-filter-3-line"
            },
            {
              "name": "TikTok KOC & Creator Affiliate Network Management",
              "icon": "ri-team-line"
            },
            {
              "name": "Standardized Content Briefs & Brand DO/DON'T Rules",
              "icon": "ri-file-list-3-line"
            },
            {
              "name": "TikTok Shop Mall Storefront, Listing SEO & Thumbnails",
              "icon": "ri-shopping-bag-3-line"
            },
            {
              "name": "Commercial On-Page SEO & Conversion Copywriting",
              "icon": "ri-article-line"
            }
          ]
        },
        {
          "title": "Data, Reporting & AI",
          "icon": "ri-cpu-line",
          "skills": [
            {
              "name": "Automated KPI Dashboards (Google Sheets & Claude AI)",
              "icon": "ri-dashboard-3-line"
            },
            {
              "name": "Meta Ads Manager & Business Suite Insights",
              "icon": "ri-bar-chart-box-line"
            },
            {
              "name": "TikTok Shop Seller Analytics & GMV Pacing",
              "icon": "ri-pie-chart-2-line"
            },
            {
              "name": "Market Intelligence & Buyer Persona Research",
              "icon": "ri-user-search-line"
            },
            {
              "name": "Prompt Engineering for Marketing Automation & Analytics",
              "icon": "ri-robot-2-line"
            }
          ]
        }
      ]
    },
    "journey": {
      "tag": "WORK EXPERIENCE",
      "title": "Work Experience & Career Milestones",
      "subtitle": "Direct roles and key responsibilities held across brands.",
      "timeline": [
        {
          "year": "02/2026 – 05/2026",
          "role": "Digital Marketing Executive",
          "company": "Fujiwa Vietnam",
          "desc": "Managed ~200M VND Meta Ads budget for B2B dealer recruitment (CPL < 130K, 53 signed dealers); scaled TikTok Shop GMV Max (ROI 10.6x), coordinated 28+ KOC/Affiliate network, and spearheaded Fujiwa Speed launch."
        },
        {
          "year": "05/2025 – 01/2026",
          "role": "Performance Marketing",
          "company": "Agrizen",
          "desc": "Spearheaded agricultural market entry in Central Highlands & Mekong Delta via Meta Ads: Generated 1,223 MQLs, achieved 34.42% Messenger closing rate, and peaked at 1.2B VND monthly revenue."
        },
        {
          "year": "10/2024 – 04/2025",
          "role": "Content Marketing",
          "company": "Worldline Technology",
          "desc": "Synthesized macroeconomic trade reports into concise business intelligence briefs for the Vietnam Market Report community; distilled complex export data into clear visual formats."
        },
        {
          "year": "Freelance",
          "role": "SEO Content Writer",
          "company": "Toan Phat Commercial Kitchen",
          "desc": "Conducted B2B search intent keyword research, developed topic cluster content plans, and executed on-page SEO articles for commercial kitchen and catering equipment."
        }
      ]
    },
    "contact": {
      "tag": "CONNECT & COLLABORATE",
      "title": "Let's Build Measurable Growth",
      "subtitle": "Looking for a performance-driven marketer or exploring business growth partnerships? Let's connect!",
      "infoTitle": "Direct Contact Details",
      "email": "leducviet038@gmail.com",
      "phone": "0932 478 949",
      "location": "Ho Chi Minh City / Remote",
      "socials": [
        {
          "name": "LinkedIn",
          "url": "https://www.linkedin.com/in/viet-le-duc-64a167353/",
          "icon": "ri-linkedin-box-fill"
        }
      ],
      "formName": "Your Full Name",
      "formEmail": "Email Address",
      "formPhone": "Phone Number",
      "formService": "Scope of Interest",
      "formServiceOpts": [
        "Paid Ads & ROAS Optimization (Meta, TikTok)",
        "B2B Lead Generation & Dealer Recruitment",
        "TikTok Shop Operations & KOC Affiliate",
        "Full-time Career Opportunity / Long-term Project"
      ],
      "formMessage": "Briefly share your project or hiring scope",
      "btnSubmit": "Send Inbound Message",
      "btnSending": "Transmitting...",
      "successMsg": "Your default email client has opened with a pre-filled draft. Simply hit send, or reach out directly at leducviet038@gmail.com."
    },
    "footer": {
      "copyright": "© 2026 Le Duc Viet. All rights reserved. Crafted with passion & modern web technologies.",
      "backToTop": "Back to top"
    },
    "modal": {
      "challengeTitle": "Key Objectives & Context",
      "strategyTitle": "Execution Steps & Strategy",
      "resultsTitle": "Key Achievements & Measurable Impact",
      "closeBtn": "Close Modal",
      "roleTitle": "Role & Scope",
      "periodTitle": "Timeline",
      "learningsTitle": "Key Takeaways & Next Steps"
    }
  }
};
