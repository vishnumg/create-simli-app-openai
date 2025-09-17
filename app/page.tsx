"use client";
import React, { useEffect, useState } from "react";
import SimliOpenAI from "./SimliOpenAI";
import DottedFace from "./Components/DottedFace";
import SimliHeaderLogo from "./Components/Logo";
// Image import removed; no images used directly on this page

interface avatarSettings {
  name: string;
  openai_voice: "alloy" | "ash" | "ballad" | "coral" | "echo" | "sage" | "shimmer" | "verse";
  openai_model: string;
  simli_faceid: string;
  initialPrompt: string;
}

// Customize your avatar here
const avatar: avatarSettings = {
  name: "Loyola Assistant",
  openai_voice: "ash",
  openai_model: "gpt-realtime-2025-08-28",
  simli_faceid: "2bf19506-fd38-4296-b652-b7f661242004",
  initialPrompt:
    `You are a helpful, friendly AI assistant designed to provide information, answer questions, and engage in conversation. You speak only English. Your tone should be warm and approachable while remaining professional. Answer user's questions in short engaging responses. Refer to the following knowledgebase:

# Loyola School Diary 2024–2025 — RAG Knowledge Base (Complete)

> Structured for retrieval with clear context separation. Sections are chunkable; stop‑wise bus timings are fully included.

---

## 1) Academic Calendar — Key Dates (High‑Level)

### June 2024
- 03 — Reopening for Classes I–XII; Orientation; Blessing of classrooms & buses; Class Leader selection
- 04 — Reopening for UKG; PTM & election of Parent Representative
- 05 — Reopening for LKG; PTM & election of Parent Representative
- 07 — Academic Award Day; Holy Mass; Assembly for VI–XII; School Leader election
- 08 — PTA General Body (I–V: 8:30–10:30; VI–XII: 11:30–13:30)
- 12 — Investiture (leaders/captains); selection for clubs & squads
- 24–28 — Monthly Test

### July 2024
- 06 — LA Fest
- 10–12 — L’Talentum (Juniors); Field Trips for IX–XII
- 13 — Open House
- 22–26 — Monthly Test
- 30 — Special Assembly: Feast of St Ignatius of Loyola

### August 2024
- 10 — Annual Sports Day
- 14 — Independence Day Special Assembly
- 21–23 — L’Talentum (Seniors)
- 29 — First Term Exams begin

### September 2024
- 05 — Teachers’ Day celebration
- 13 — Onam Celebration
- 14–22 — Onam Holidays (Reopening on 23 Sep)
- 27–28 — Loyola Cup Basketball Tournament
- 30 — Open House for Classes I–III

### October 2024
- 01 — Open House for IV–VI
- 03 — Open House for VII–VIII
- 04 — Open House for IX & XI
- 05 — LA Spectra (Science/Maths/Social/IT/Languages/Art Exhibition)
- 07 — Open House for X & XII; Excursions window opens (07–11)
- 23–29 — Monthly Test
- 30 — Deepavali Celebration; Special Assembly for Non‑teaching Staff

### November 2024
- 01 — Kerala Piravi; Naadan Paattum Drishyavishkaravum
- 09 — Zest (Parents’ Carnival)
- 11 — First Model Exams (X & XII) start
- 14 — Children’s Day Special Assembly & Celebration
- 28–30 — Theatre Day; Annual Day (I & II sessions)

### December 2024
- 05 — Second Model Exams (X & XII) start
- 09 — Second Term Exams begin (I–IX & XI)
- 21 — Christmas Celebration (Holidays 22 Dec – 2 Jan; Reopening 3 Jan 2025)

### January 2025
- 10 — Personal Magazine Submission (X & XII); Farewell to Class XII
- 13 — Annual Exams for IX & XI begin
- 18 — KG Grandparents’ Day
- 27–31 — Monthly Test

### February 2025
- 03 — Open House for I–III; Classes begin for incoming X & XII
- 04 — Open House for IV–VI
- 05 — Open House for VII–VIII
- 06 — Music Day; Submission of Personal Magazine

### March 2025
- 01 — KG Award Day
- 10 — Annual Exams for LKG–VIII
- 29 — General PTA; Gratitude Day; Award Distribution
- 31 — Evaluation & Planning; School closes for summer

---

## 2) Monthly Planner — Detailed Highlights (Chronological)

### June 2024 (Detailed)
- Reopenings & Orientations across LKG/UKG/I–XII; blessing of classrooms/buses; selection of leaders; PTA GBM
- Elections: General Captain, House Captains, Junior School Leader; selection of school Basketball/Cricket/Football/Swimming teams
- Assemblies (I/III; II/IV; V/VII; VI/VIII; IX/XI; X/XII; LKG FN & UKG AN); Holy Mass; Class LA
- Inter‑house events: Basketball; Table Tennis; Monthly Quiz; Yoga Day
- SZSC Academic Excellence Award Ceremony
- Monthly Test window: 24–28

### July 2024 (Detailed)
- Assemblies for all blocks (LKG/UKG; I–IV; V–VIII; IX–XII); Holy Mass; Club Activity
- Inter‑house Football & Cricket; Monthly Quiz
- Composition Submissions (I–V; VI–VIII; IX–X; XI–XII; I–II)
- LA Fest (06); L’Talentum for Junior School (10–12)
- Field trips: IX–XII during L’Talentum
- Class LA (Senior School); Open House (13); Muharram (holiday)
- Monthly Tests: 22–26; Special Assembly (30) Feast of St Ignatius; Feast Day (31)

### August 2024 (Detailed)
- Holy Mass; Club Activity; Karkidaka Vavu
- Assemblies across classes (LKG/UKG; I–IV; V–VIII; IX–XII)
- Composition submissions (I–V; I–II; VI–VIII); Class LA
- Annual Sports Day (10); Independence Day Special Assembly (14) & Independence Day (15)
- Monthly Quiz (Junior School)
- Sree Narayana Guru Jayanthi (17)
- L’Talentum (Senior School) & Composition submissions (IX–X; XI–XII)
- Sreekrishna Jayanthi; Ayyankali Jayanthi
- First Term Exams begin (29)

### September 2024 (Detailed)
- Teachers’ Day Celebration (05); Holy Mass; Club Activity
- Onam Celebration; Onam holidays (from ~14); Thiruvonam
- Reopening after Onam (23): Assemblies resume
- Loyola Cup Basketball Tournament (27–28)
- Open House for I–III (30)

### October 2024 (Detailed)
- Open Houses (01: IV–VI; 03: VII–VIII; 04: IX & XI; 07: X & XII)
- Gandhi Jayanthi (02)
- LA Spectra Exhibition (05)
- Submissions: IX–X; XI–XII; composition cycles; Club Activity
- Excursion window (07–11); Retreat; Mahanavami; Vijayadashmi
- Zero period for Annual Day prep begins (mid‑Oct)
- Monthly Quiz & Monthly Tests (late Oct)
- Deepavali Celebration; St Rodriguez’s Day (end Oct)

### November 2024 (Detailed)
- Kerala Piravi & Cultural Programme; Holy Mass; Club Activity
- Composition Submissions (III–V; VI–VIII; IX–X; I–II; XI–XII)
- Assemblies for all blocks
- ZEST (Parents’ Carnival) (09)
- First Model Exams (X & XII) start (11)
- Children’s Day Special Assembly (14)
- Monthly Quiz (mid‑Nov)
- Model Exams end (around 21–22); Final stage rehearsals
- Theatre Day; Annual Day Celebrations (LKG–III then IV–XII) (28–30)

### December 2024 (Detailed)
- Open Houses (X & XII; IX & XI; I–III; IV–VI; VII–VIII)
- Second Model Exams (X & XII) begin (05)
- Second Term Exams (I–IX & XI) begin (09)
- Model Practicals (mid‑Dec)
- Christmas Celebration; Holidays begin (21–)

### January 2025 (Detailed)
- New Year’s Day; Mannam Jayanti
- School reopens (03 Jan); Holy Mass; Club Activity
- Field Trips (I, V, II, IX/XI/X, III, VII, VI, IV, VIII — across Jan slots)
- Class LA; Personal Magazine Submission (X & XII); Farewell to XII (10)
- Annual Exams for IX & XI (from 13)
- Kindergarten Grandparents’ Day (18)
- Republic Day (26)
- Monthly Tests (27–31); Monthly Quiz; Martyrs’ Day (31)

### February 2025 (Detailed)
- Classes for incoming X & XII start (03)
- Open Houses (03: I–III; 04: IV–VI; 05: VII–VIII)
- Music Day (06); Personal Magazine submissions
- Assemblies across LKG/UKG & I–VIII; Holy Mass; Club Activity
- Composition submissions (I–V; VI–VIII)
- Class LA; Monthly Quiz
- Monthly Tests for incoming X & XII (late Feb)
- Mahashivratri (late Feb)

### March 2025 (Detailed)
- KG Award Day (01)
- Annual Exams LKG–VIII (10–)
- Attukal Pongala (early Mar)
- Monthly Tests (incoming X & XII) throughout mid‑Mar
- General PTA; Gratitude Day; Award Distribution (29)
- Evaluation & Planning; Summer Vacation begins (31)

---

## 3) Examinations & Assessments (At a Glance)
- **Monthly Tests:** typically last week of month
- **First Term Exams:** begin 29 Aug 2024
- **Second Term Exams:** begin 09 Dec 2024 (Classes I–IX, XI)
- **Model Exams (X & XII):** First (from 11 Nov 2024), Second (from 05 Dec 2024)
- **Annual Exams:** IX & XI (from 13 Jan 2025); LKG–VIII (from 10 Mar 2025)

---

## 4) Bus Services — Stop‑wise Timings (AM / PM)

> **Note:** AM = pickup towards Loyola. PM = drop from Loyola. Phone = bus in‑charge contact.

### Bus 01 — Phone: 99471 70571 (Praveen)
| Stop | AM | PM |
|---|---:|---:|
| Loyola | 06:40 | 04:45 |
| Vazhuthacaud | 07:10 | 03:40 |
| Radio Station | 07:10 | 03:40 |
| Jagathy | 07:15 | 03:45 |
| Anwar Gardens | 07:15 | 03:45 |
| Kunjalummoodu | 07:20 | 03:50 |
| Pappanamcode | 07:30 | 04:00 |
| Kaimanam | 07:33 | 03:55 |
| Karamana | 07:35 | 04:10 |
| Kailash | 07:37 | 04:15 |
| Killippalam | 07:40 | 04:20 |
| Loyola | 08:15 | 03:15 |

### Bus 02 — Phone: 97473 24465 (Padmakumar K)
| Stop | AM | PM |
|---|---:|---:|
| Loyola | 06:40 | 05:10 |
| Valiathura Jn | 07:05 | 04:35 |
| Valiathura Vidhya Gardens | 07:05 | 04:35 |
| Kallummoodu Jn / By‑pass | 07:10 | 04:30 |
| Poonthura Market Jn | 07:15 | 04:25 |
| Thiruvallom | 07:17 | 04:20 |
| Milma | 07:20 | 04:15 |
| Ambalathara Jn | 07:20 | 04:15 |
| Ambalathara U.P.S. | 07:20 | 04:10 |
| Kallattumukku | 07:25 | 04:10 |
| Kamaleswaram | 07:30 | 04:05 |
| Balavan Nagar | 07:30 | 04:00 |
| UAE Consulate | 07:35 | 03:55 |
| Fort H.S. | 07:40 | 03:50 |
| Loyola | 08:15 | 03:15 |

### Bus 03 — Phone: 96335 49324 (Binol)
| Stop | AM | PM |
|---|---:|---:|
| Loyola | 06:50 | 04:30 |
| Kochuveli Railway Station | 07:25 | 03:55 |
| All Saints’ | 07:30 | 03:50 |
| Chacka ITI | 07:30 | 03:50 |
| Pettah Temple | 07:45 | 03:45 |
| Chayakkudi Lane | 07:47 | 03:42 |
| Kannanmoola Bridge | 07:48 | 03:41 |
| Burma Road | 07:50 | 03:40 |
| Kumarapuram Jn | 07:52 | 03:37 |
| Tagore Gardens | 07:55 | 03:35 |
| Medical College | 08:00 | 03:30 |
| Loyola | 08:15 | 03:15 |

### Bus 04 — Phone: 98469 33620 (Jijin)
| Stop | AM | PM |
|---|---:|---:|
| Loyola | 07:00 | 04:20 |
| Chacka | 07:25 | 04:05 |
| Manava Nagar | 07:27 | 04:00 |
| Enjakkal | 07:30 | 03:55 |
| Subhash Nagar | 07:32 | 03:50 |
| Padinjarekottah | 07:35 | 03:45 |
| Palkulangara (Library) | 07:37 | 03:40 |
| Palkulangara (NSS) | 07:40 | 03:40 |
| Pettah Post Office | 07:40 | 03:35 |
| NISH | 07:57 | 03:30 |
| Alathara | 08:00 | 03:25 |
| Loyola | 08:15 | 03:15 |

### Bus 05 — Phone: 94968 12175 (Sudheesh)
| Stop | AM | PM |
|---|---:|---:|
| Loyola | 07:00 | 04:20 |
| Law College | 07:30 | 03:50 |
| Varambaserry | 07:32 | 03:50 |
| Miranda Jn | 07:33 | 03:45 |
| Vadayakkadu | 07:35 | 03:45 |
| PT Chacko Nagar | 07:45 | 03:35 |
| Neerazhi Lane | 07:50 | 03:30 |
| Kochulloor | 07:50 | 03:30 |
| Pongummoodu | 07:55 | 03:25 |
| Chenthy | 07:55 | 03:25 |
| Kallampally | 08:00 | 03:20 |
| Loyola | 08:15 | 03:15 |

### Bus 06 — Phone: 96054 12348 (Sreelal)
| Stop | AM | PM |
|---|---:|---:|
| Loyola | 07:00 | 04:35 |
| Elangam Lane | 07:25 | 03:55 |
| Sreerangam Lane | 07:25 | 03:55 |
| Sasthamangalam | 07:25 | 04:00 |
| TTC | 07:35 | 03:50 |
| Saraswathy Nilayam | 07:35 | 03:50 |
| Jawahar Nagar | 07:35 | 03:50 |
| Devaswom Board | 07:40 | 03:45 |
| YMR | 07:40 | 03:40 |
| Nanthancode | 07:45 | 03:40 |
| PMG | 07:50 | 03:35 |
| Plammoodu | 07:50 | 03:35 |
| Loyola | 08:15 | 03:15 |

### Bus 07 — Phone: 94472 04328 (Santhosh)
| Stop | AM | PM |
|---|---:|---:|
| Loyola | 06:35 | 04:45 |
| Perukavu | 07:20 | 04:05 |
| Mangattukadavu | 07:20 | 04:00 |
| Puthankada | 07:25 | 03:55 |
| Poojappura | 07:27 | 04:10 |
| Chengallore | 07:30 | 04:15 |
| Vijaya Mills | 07:32 | 04:10 |
| Pallimukku | 07:35 | 03:50 |
| SK Hospital | 07:40 | 03:45 |
| Edapazhinji | 07:40 | 03:40 |
| Cotton Hill | 07:40 | 03:40 |
| LIC | 07:50 | 03:30 |
| Loyola | 08:15 | 03:15 |

### Bus 08 — Phone: 99476 49960 (Sumesh)
| Stop | AM | PM |
|---|---:|---:|
| Loyola | 06:45 | 04:45 |
| Vettamukku | 07:05 | 04:20 |
| PTP Nagar | 07:10 | 04:20 |
| Arappura | 07:13 | 04:15 |
| Lake View Lane | 07:13 | 04:15 |
| Vattiyoorkavu | 07:15 | 04:10 |
| Manjadimoodu | 07:17 | 04:10 |
| Kanjirampara | 07:17 | 04:05 |
| Maruthumkuzhy | 07:20 | 04:05 |
| Pippinmoodu | 07:25 | 04:00 |
| SAP Camp | 07:27 | 04:00 |
| Latex Jn | 07:30 | 03:55 |
| SFS Vasantham | 07:35 | 03:55 |
| Museum | 07:35 | 03:55 |
| Loyola | 08:15 | 03:15 |

### Bus 09 — Phone: 99958 47151 (Sheeba)
| Stop | AM | PM |
|---|---:|---:|
| Loyola | 06:50 | 04:25 |
| Edavakode | 07:00 | 04:20 |
| Parottukonam | 07:05 | 04:15 |
| Paruthippara | 07:10 | 04:10 |
| Muttada | 07:15 | 04:05 |
| Vayalikada | 07:20 | 04:00 |
| Cheshire Home | 07:25 | 03:55 |
| Kuravankonam Market | 07:30 | 03:50 |
| Kuravankonam Jn | 07:30 | 03:50 |
| Welgate | 07:35 | 03:45 |
| KV Pattom | 07:35 | 03:45 |
| Big Bazaar | 07:40 | 03:40 |
| Bapuji Nagar | 07:55 | 03:35 |
| Panchayath Office | 08:00 | 03:30 |
| Prasanth Nagar | 08:02 | 03:27 |
| Priyadarsini Nagar | 08:05 | 03:25 |
| Loyola | 08:15 | 03:15 |

### Bus 10 — Phone: 96054 21376 (Midhun)
| Stop | AM | PM |
|---|---:|---:|
| Loyola | 07:00 | 04:40 |
| East Fort (Attakulangara) | 07:25 | 04:05 |
| Sreevaraham | 07:27 | 04:00 |
| Vazhapally | 07:30 | 03:57 |
| Ayurveda College | 07:35 | 03:52 |
| Statue | 07:40 | 03:50 |
| Palayam | 07:42 | 03:45 |
| Marappalam | 07:45 | 03:40 |
| TKD – I | 07:50 | 03:40 |
| TKD – II | 07:50 | 03:40 |
| Muttada Jn | 07:55 | 03:37 |
| Muttada Church | 07:57 | 03:35 |
| M G College | 08:00 | 03:30 |
| Loyola | 08:15 | 03:15 |

### Bus 11 — Phone: 98952 49006 (Anilkumar B)
| Stop | AM | PM |
|---|---:|---:|
| Loyola | 07:05 | 04:25 |
| Keraladithyapuram | 07:20 | 04:10 |
| Mannanthala | 07:25 | 04:05 |
| Mannanthala Press | 07:25 | 04:05 |
| Maruthoor | 07:30 | 04:00 |
| Mukkola | 07:35 | 03:55 |
| Kottamugal | 07:35 | 03:55 |
| Step Junction | 07:40 | 03:50 |
| Nalanchira | 07:45 | 03:45 |
| Paruthippara | 07:50 | 03:40 |
| Kesavadasapuram | 07:55 | 03:35 |
| Idiyadikode Temple | 08:00 | 03:30 |
| Pulayanar Kottah | 08:05 | 03:25 |
| Loyola | 08:15 | 03:15 |

### Bus 12 — Phone: 73562 20136 (Xavier)
| Stop | AM | PM |
|---|---:|---:|
| Loyola | 07:05 | 04:15 |
| General Hospital | 07:35 | 04:00 |
| Vanchiyoor | 07:35 | 04:00 |
| Pattoor Church | 07:40 | 03:55 |
| EMS Nagar | 07:40 | 03:55 |
| Moolavilakom | 07:45 | 03:50 |
| Thampuranmukku | 07:50 | 03:45 |
| Gowreesapattom | 07:50 | 03:45 |
| Kottara Lane | 07:50 | 03:40 |
| Pottakkuzhi | 07:55 | 03:40 |
| GG Hospital | 07:55 | 03:35 |
| Puthupalli Lane | 07:55 | 03:30 |
| Loyola | 08:15 | 03:15 |

### Bus 13 — Phone: 94472 04461 (Thomas John)
| Stop | AM | PM |
|---|---:|---:|
| Loyola | 07:05 | 04:25 |
| Rose Gardens | 07:30 | 04:00 |
| Silver Hills | 07:30 | 04:00 |
| Venpalavattom | 07:35 | 03:55 |
| Lords Hospital | 07:37 | 03:55 |
| Arasummoodu | 07:38 | 03:50 |
| Anayara L.P.S. | 07:40 | 03:50 |
| Kallummoodu | 07:42 | 03:45 |
| Pettah Market | 07:45 | 03:45 |
| Avittom Road | 07:50 | 03:40 |
| Loyola | 08:15 | 03:15 |

### Bus 14 — Phone: 95446 26391 (Pournami)
| Stop | AM | PM |
|---|---:|---:|
| Loyola | 07:00 | 04:35 |
| Kaithamukku | 07:15 | 04:05 |
| Railway Bridge | 07:20 | 04:02 |
| Ambalathumukku | 07:25 | 04:00 |
| Palpu Road | 07:30 | 03:55 |
| Lulu Mall | 07:40 | 03:50 |
| Technopark Back Gate | 07:50 | 03:35 |
| Thrippadapuram | 08:00 | 03:30 |
| Loyola | 08:15 | 03:15 |

### Bus 15 — Phone: 99478 31060 (Archana)
| Stop | AM | PM |
|---|---:|---:|
| Loyola | 07:00 | 04:30 |
| Vazhayila | 07:20 | 04:10 |
| Peroorkada (Police Station) | 07:35 | 03:55 |
| Peroorkada (Church) | 07:35 | 03:55 |
| Ambalamukku | 07:40 | 03:53 |
| Toll Jn | 07:40 | 03:52 |
| Kowdiar | 07:45 | 03:51 |
| Pandit Colony | 07:50 | 03:40 |
| Ulloor Bridge | 07:55 | 03:35 |
| Ulloor | 07:55 | 03:35 |
| Thuruvickal | 08:00 | 03:30 |
| Latex | 08:05 | 03:25 |
| SNDP | 08:10 | 03:20 |
| Cheruvickal | 08:10 | 03:20 |
| Loyola | 08:15 | 03:15 |

### Bus 16 — Phone: 81380 52130 (Dhanya)
| Stop | AM | PM |
|---|---:|---:|
| Loyola | 07:00 | 04:25 |
| Water Works | 07:15 | 04:10 |
| Sreemulam Club | 07:20 | 04:05 |
| Police Training Ground | 07:20 | 04:05 |
| Mettukada | 07:30 | 04:00 |
| Bakery Junction | 07:35 | 03:55 |
| Nalumukku | 07:40 | 03:50 |
| Pallimukku | 07:42 | 03:47 |
| Kannammoola Jn | 07:45 | 03:45 |
| Simi Theatre | 07:50 | 03:40 |
| Punjab National Bank | 07:55 | 03:35 |
| Loyola | 08:15 | 03:15 |

### Bus 17 — Phone: 97473 59117 (Kavitha)
| Stop | AM | PM |
|---|---:|---:|
| Loyola | 07:05 | 04:20 |
| Puthenthope | 07:30 | 04:00 |
| St Andrews | 07:32 | 03:58 |
| Arattu Jn | 07:33 | 03:57 |
| Marian Engg College | 07:35 | 03:55 |
| Menomkulam | 07:37 | 03:53 |
| Jyothis Jn | 07:39 | 03:52 |
| Kariyil Nalumukku | 07:40 | 03:50 |
| Railway Over Bridge | 07:42 | 03:48 |
| Kazhakuttom Police Station | 07:45 | 03:45 |
| Ambalathinkara | 07:48 | 03:43 |
| Honda Service Station | 07:50 | 03:40 |
| Green Field Stadium | 07:52 | 03:38 |
| Karyavattom Jn | 07:55 | 03:35 |
| Gurumandiram | 07:57 | 03:32 |
| Pangappara H C | 08:00 | 03:30 |
| Mankuzhi | 08:03 | 03:27 |
| Chavadimukku | 08:05 | 03:25 |
| Loyola | 08:15 | 03:15 |

### Bus 18 — Phone: 97453 39015 (Bindhu)
| Stop | AM | PM |
|---|---:|---:|
| Loyola | 06:55 | 04:25 |
| SFS Cyber Gate | 07:25 | 04:05 |
| Sainik School | 07:27 | 04:00 |
| Chanthavila | 07:30 | 03:55 |
| Narikkal | 07:32 | 03:50 |
| Kattayikonam | 07:35 | 03:45 |
| Sasthavattom | 07:40 | 03:40 |
| Chenkottukonam | 07:45 | 03:35 |
| Anandeswaram | 07:45 | 03:35 |
| Ahladapuram | 07:50 | 03:30 |
| Aniyoor Jn | 07:55 | 03:35 |
| Chempazhanthy | 07:55 | 03:35 |
| Udayagiri | 07:55 | 03:30 |
| Venchavode | 08:00 | 03:25 |
| Chekkalamukku | 08:00 | 03:20 |
| Loyola | 08:15 | 03:15 |

### Bus 19 — Phone: 79070 69390 (Preetha)
| Stop | AM | PM |
|---|---:|---:|
| Loyola | 06:55 | 04:35 |
| LNCP | 07:05 | 04:25 |
| Kurisadi Jn | 07:10 | 04:20 |
| Pullannivila | 07:10 | 04:20 |
| Thundathil School | 07:15 | 04:15 |
| Pothencode | 07:20 | 04:10 |
| Santhigiri Ashramam | 07:20 | 04:10 |
| Plamoodu | 07:20 | 04:10 |
| Ayirooppara | 07:25 | 04:05 |
| Charummoodu | 07:30 | 04:00 |
| Santhipuram | 07:35 | 03:55 |
| Njandoorkonam | 07:40 | 03:50 |
| Melemukku | 07:45 | 03:45 |
| Powdikonam | 07:50 | 03:40 |
| Vattavila | 07:55 | 03:35 |
| Societymukku | 08:00 | 03:30 |
| Chellamangalam | 08:05 | 03:25 |
| Kariyam | 08:10 | 03:20 |
| Loyola | 08:15 | 03:15 |

### Bus 20 — Phone: 98477 39257 (Renjini)
| Stop | AM | PM |
|---|---:|---:|
| Loyola | 07:35 | 03:55 |
| MGM | 07:45 | 03:45 |
| Kazhakuttom Jn | 07:55 | 03:35 |
| Loyola | 08:15 | 03:15 |

### Bus 21 — Phone: 95449 40473 (Sheeja)
| Stop | AM | PM |
|---|---:|---:|
| Loyola | 07:00 | 04:30 |
| Mangalapuram | 07:15 | 04:15 |
| Pallippuram | 07:20 | 04:10 |
| Kaniyapuram | 07:25 | 04:05 |
| Vetturoad | 07:35 | 03:55 |
| Technopark Gate (B‑6) | 07:40 | 03:50 |
| Attinkuzhy | 07:45 | 03:45 |
| Mukkolackal | 07:50 | 03:40 |
| Kulathoor Jn | 07:55 | 03:35 |
| Arasumoodu Jn | 08:00 | 03:30 |
| Monvila Jn | 08:05 | 03:25 |
| Emmaus Church | 08:10 | 03:20 |
| Loyola | 08:15 | 03:15 |

---

## 5) Additional Trips & Special Routes

### Second Trip — LONG (PM)
**Time window:** 05:00–06:15 PM

| Stop | PM |
|---|---:|
| Loyola | 05:00 |
| Kesavadasapuram | 05:10 |
| Pattom | 05:10 |
| Marappalam | 05:15 |
| Kuravankonam | 05:20 |
| Kowdiar | 05:20 |
| Vellayambalam | 05:25 |
| Sasthamangalam | 05:30 |
| Vellayambalam | 05:30 |
| Vazhuthacaudu | 05:35 |
| Women’s College | 05:40 |
| Thampanoor | 05:45 |
| Over Bridge | 05:45 |
| Statue | 05:50 |
| Palayam | 05:50 |
| P.M.G. | 05:55 |
| Loyola | 06:15 |

### Second Trip — SHORT (PM)
**Route (sequence):** Loyola → Kallampally → Pongummoodu → Ulloor → Medical College → Kumarapuram → Kannammoola → Nalumukku → Ambalathumukku → Collectorate (Old) → Vanchiyoor → Pattoor → Pallimukku → Chayakudi Lane → Loyola

### PTA Route — AM Special

| Stop | AM |
|---|---:|
| Loyola | 10:10 |
| Kesavadasapuram | 10:25 |
| Pattom | 10:25 |
| Marappalam | 10:30 |
| Kuravankonam | 10:35 |
| Kowdiar | 10:35 |
| Vellayambalam | 10:40 |
| Sasthamangalam | 10:40 |
| Vazhuthacaud | 10:45 |
| Women’s College | 10:45 |
| Statue | 10:50 |
| Ayurveda College | 10:55 |
| Collectorate | 10:55 |
| Vanchiyoor | 11:00 |
| Pattoor | 11:00 |
| Nalumukku | 11:05 |
| Pallimukku | 11:05 |
| Kannammoola | 11:10 |
| Kumarapuram | 11:15 |
| Medical College | 11:20 |
| Loyola | 11:30 |

---

## 6) After Extracurricular Activities & Special Classes — Evening Buses

> The following depart **after EC activities/special classes** (evening). Times below are PM times per stop.

### Bus No. 01 — After EC/Special Classes
| Stop | PM |
|---|---:|
| Panavila | 06:00 |
| Killippalam | 05:55 |
| Kailas Nagar | 05:50 |
| Karamana | 05:50 |
| Pappanamcode | 05:45 |
| Poojappura | 05:40 |
| Vijaya Mills | 05:35 |
| Pallimukku | 05:35 |
| Pangode | 05:30 |
| Edapazhinji | 05:25 |
| Jagathy | 05:25 |
| Vazhuthacaud | 05:20 |
| Vellayambalam | 05:15 |
| Sasthamangalam | 05:15 |
| Pippinmoodu | 05:10 |
| Kowdiar | 05:10 |
| Kuravankonam | 05:10 |
| YMR Jn | 05:10 |
| Nanthencode | 05:05 |
| Museum | 05:05 |
| PMG | 05:05 |
| Plamoodu | 05:00 |
| Pattom | 05:00 |
| Kesavadasapuram | 04:55 |
| Ulloor | 04:50 |
| Pulayanarkottah | 04:45 |
| Cheruvickal | 04:42 |
| Loyola | 04:40 |

### Bus No. 02 — After EC/Special Classes
| Stop | PM |
|---|---:|
| Lords Hospital | 05:45 |
| Lulu Mall | 05:40 |
| MGM School | 05:35 |
| Attinkuzhy | 05:30 |
| Technopark Gate | 05:25 |
| St Andrews | 05:20 |
| Menomkulam | 05:15 |
| Kazhakuttom | 05:10 |
| Thrippadapuram | 05:05 |
| Kariyavattom | 05:00 |
| Pangappara HC | 04:55 |
| Mankuzhi | 04:50 |
| Chavadimukku | 04:45 |
| Loyola | 04:40 |

### Bus No. 03 — After EC/Special Classes
| Stop | PM |
|---|---:|
| Manacaud | 05:55 |
| Sreevaraham | 05:50 |
| Collectorate | 05:45 |
| Vanchiyoor | 05:40 |
| Pattoor | 05:35 |
| Nalumukku | 05:30 |
| Kannammoola | 05:25 |
| Goureesapattom | 05:20 |
| Pottakkuzhy | 05:15 |
| GG Hospital | 05:10 |
| Kumarapuram | 05:05 |
| Medical College | 05:00 |
| Ulloor | 04:55 |
| Pongummoodu | 04:50 |
| Kallampally | 04:45 |
| Loyola | 04:40 |

### Bus No. 04 — After EC/Special Classes
| Stop | PM |
|---|---:|
| LNCP | 06:10 |
| Kurisadi Junction | 06:05 |
| Pullannivila | 06:00 |
| Thundathil | 05:55 |
| Chenkottukonam | 05:50 |
| Sasthavattom | 05:45 |
| Kattayikonam | 05:40 |
| Pothencode | 05:35 |
| Melemukku | 05:30 |
| Plamoodu | 05:25 |
| Ayiroorpara | 05:20 |
| Charumoodu | 05:15 |
| Njandoorkonam | 05:10 |
| Powdikonam | 05:05 |
| Vattavila | 05:00 |
| Chellamangalam | 04:55 |
| Kariyam | 04:50 |
| Loyola | 04:40 |

---
`,
};

const Demo: React.FC = () => {
  const [showDottedFace, setShowDottedFace] = useState(true);
  const [initialPrompt, setInitialPrompt] = useState<string>(avatar.initialPrompt);

  useEffect(() => {
    let isMounted = true;
    const loadPrompt = async () => {
      try {
        const res = await fetch("/api/prompt", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        if (isMounted && text?.trim()) setInitialPrompt(text);
      } catch (e) {
        console.warn("Falling back to embedded prompt:", e);
      }
    };
    loadPrompt();
    return () => {
      isMounted = false;
    };
  }, []);

  const onStart = () => {
    console.log("Setting setshowDottedface to false...");
    setShowDottedFace(false);
  };

  const onClose = () => {
    console.log("Setting setshowDottedface to true...");
    setShowDottedFace(true);
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center font-abc-repro font-normal text-sm text-white p-8">
      <SimliHeaderLogo />
      {/* Top-right area intentionally left blank for Loyola site (remove Simli GitHub link) */}
      <div className="flex flex-col items-center gap-6 bg-effect15White p-4 md:p-6 pb-[40px] rounded-xl w-full max-w-[1700px]">
        <div>
          {showDottedFace && <DottedFace />}
          <SimliOpenAI
            openai_voice={avatar.openai_voice}
            openai_model={avatar.openai_model}
            simli_faceid={avatar.simli_faceid}
            initialPrompt={initialPrompt}
            onStart={onStart}
            onClose={onClose}
            showDottedFace={showDottedFace}
          />
        </div>
      </div>
    </div>
  );
};

export default Demo;
