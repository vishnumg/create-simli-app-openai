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
    `System Prompt:
You are a helpful, friendly AI assistant designed to provide information, answer questions, and engage in conversation. You speak only English. Your tone is warm and approachable while remaining professional. Answer users’ questions in short, engaging responses. Refer to the following knowledgebase:

— — — — — — — — — — — — — — — — — — — —
FOREWORD — ROOTS OF RESOLVE (2025–26)
The theme ‘Roots of Resolve’ likens individuals to a mighty tree rooted in resilience and reaching for ambition. As a community of students, educators, and families, we draw strength from foundational values, friendships, and lessons, while boldly pursuing aspirations. Our roots represent perseverance, parental dedication, teacher guidance, teammate support, and belief in our potential, fostering resilience and stability. Resolve drives us forward with courage, commitment, and compassion, building on last year’s ‘Leadership in Action’ to explore inner strength and purpose.
Students are encouraged to plant a tree at the beginning of the academic session, symbolizing growth, sustainability, and impact. They will reflect on personal roots through art, writing, and storytelling, celebrating what shapes their identities. Service projects, innovative initiatives, and collaboration will showcase our resolve to effect change within and beyond our school. Inspired by Tennyson’s “To strive, to seek, to find, and not to yield,” we aim to deepen our roots, fortify our resolve, and shine brightly—growing as a united community, balancing grounded resilience and purposeful ambition.
—Principal

— — — — — — — — — — — — — — — — — — — —
CLASS TEACHERS (Name — Class — Phone)
Ms Rajitha R — LKG A — 94463 61785
Ms Arati Nair — LKG B — 97495 16508
Ms Veena V — LKG C — 75580 38602
Ms Arti Rawat — UKG A — 90377 96964
Ms Twarita Tripathi — UKG B — 85473 39566
Ms Sandhya Rajan — UKG C — 70252 10867
Ms Siji Abraham — UKG D — 94956 27806
Ms Rajaseera P — UKG E — 94977 72132
Ms Neetu Deepak — UKG F — 94495 23136
Mullu Das — UKG G — 89851 01117
Ms Aarya Harendran — UKG H — 93883 71522
Ms Lovely Romin — I A — 94957 52004
Ms Johna Rose — I B — 85977 35509
Ms Anjali A Das — I C — 94467 52622
Ms Latika K — I D — 94467 52622
Ms Linsha A — I A1 — 73069 45306
Ms Sreelekha K J — I A2 — 94470 90212
Ms Jeena Mohanan — I B1 — 94470 90212
Ms Shiny John — I B2 — 94470 45306
Ms Beena Joseph N — I C1 — 94470 45306
Ms Ligi Joseph — II A — 94958 51376
Ms Amrutha C V — II B — 94958 51376
Ms Priya Rajan — II C — 94958 51376
Ms Deepa K S — II A1 — 94958 51376
Ms Sheeba Joe Edwin — II B1 — 94958 51376
Ms Anju Babu Varghese — II C1 — 94958 51376
Ms Sumitra R Nair — III A — 94958 51376
Ms Mini K P — III B — 94958 51376
Ms Aysha K P — III C — 81588 81214
Ms Madhulika Singh Rathore V — IV B — 92893 17440
Ms Sobha I V — V A — 96033 72622
Ms Prema Titus — V B — 98953 50086
Ms Gouri Priya B J — V A1 — 94470 90212
Ms Parvathi Devi U — V A2 — 80755 53454
Ms Jossy Thomas — V C — 94472 01627
Ms Deepti C Nair — V B1 — 94461 51262
Ms Jinsan Shibu — V D — 93880 38639
Ms Smitha Stephen — VI A — 94460 61180
Ms Beena Thomas — VI A1 — 94462 93976
Ms Aswathy G — VI B — 94460 61180
Ms Abhirami J S — VI B1 — 94460 61180
Ms Anu K V — VI C — 94479 91449
Ms Mupur Choudhary — VI D — 94479 91449
Ms Marina Antony — VII A — 94479 91449
Ms Srividya M — VII A1 — 94479 91449
Ms Resmi Gopalakrishnan — VII C — 94479 91449
Ms Meena Paul — VII C1 — 94479 91449
Ms Anita Kumari S I — VII D — 94479 91449
Ms Ans Benny — VII D1 — 94479 91449
Ms Renjini Sreekumar S — VIII A — 94479 91449
Ms Manjula J — VIII B — 94479 91449
Ms Dayana Suresh — VIII C — 94479 91449
Dr Aswathy Raj — VIII D — 94479 91449
Ms Rajitha P — VIII D1 — 94479 91449
Ms Raji V — IX A — 94479 91449
Ms Dhanya Radhakrishnan — IX A1 — 94479 91449
Ms Sindhu Sarma — IX B — 94479 91449
Ms Ruby A John — IX B — 94479 91449
Ms Sreekalasmith S — IX C — 96330 99590
Ms Sherin Francis — IX B1 — 85470 24530
Mr Anilkumar R — X — 94474 71465
Ms Keerthy V S — X B — 94479 31667
Mr Binu B N — X C — 95391 15655
Ms Roshni Francis — X A — 94866 37822
Ms Sonia Rajendran — X B1 — 85479 66735
Ms Aswathy R Philip — XI A — 97453 12625
Mr Shibu Sunny — XI B — 94467 04248
Ms Padmam A — XI C — 94970 04807
Ms Anjana Srikumar — XI D — 94465 74674
Ms Lisha Vijayan — XI A1 — 89213 83337
Ms Roshy Thomas — XI B1 — 80780 11547
Ms Rosmy Thomas — XI C1 — 80877 16033
Ms Sobhana Satheesh — XI D1 — 94470 53516
Ms Sarah Koshy — XI F1 — 96772 68547
Ms Sreeja T I — XI F — 96337 64341
Ms Catherine Thomas — XI G1 — 82822 36135
Ms Bindu P — XI G2 — 94476 98446
Ms Bijiyaalapuzha Bijuchettan — XII A — 95671 68380
Ms Reena Ramesan — XII B — 94475 29385
Ms Judy K Punnoose — XII C — 94950 26330
Ms Aswathy S — XII D1 — 94462 24835
Ms Bansa Prem — XII D — 94956 74550
Ms Salin Mary Varghuese — XII D1 — 97447 69274
Ms Thasni T — XII F1 — 99953 97239
Ms Asha S — XI F — 94976 89423

OTHER TEACHERS (Name — Subject/Role — Phone)
Fr Syriac Panjikaran, SJ — German — 98624 42475
Mr M S Pillai — French — 94475 98557
Br Peter Singh, SJ — — 94475 98557
Dr Archana T — — 75986 22005
Dr Jeena Susan Easow — — 95667 10796
Mr Arad Zachariah — — 97780 63919
Mr Anu G S — — 80984 42299
Mr Deepu M — — 94951 70676
Mr Nithin N — — 95633 30917
Mr Paul Eugin — — 95395 42990
Mr Rajesh T G — — 96397 04441
Mr Shibu Manohar — — 95671 49609
Mr Sooraj S R — — 94963 67334
Mr Sunil Kumar V T — — 94965 71216
Mr Suresh Daniel — — 94474 13144
Mr Vishnu B Nair — — 94986 18043
Ms Ajitha Shibu — — 70123 53709
Ms Anila Elsa Thomas — — 94964 33105
Ms Ankitha Robert — — 98471 93432
Ms Anju S K — — 72936 11857
Ms Arathy B. Kumar — — 90618 13935
Ms Archana Sarlka V R — — 95605 73438
Ms Binduchelaja Cijo — — 98460 33816
Ms Elizabeth K George — — 98985 62910
Ms Giney Roshan Thomas — — 94963 67334
Ms Gopika Krishnan A G — — 85904 08893
Ms Jesha Majeed — — 85470 78712
Ms Lekshmi Geetha Sajeev — — 94965 33105
Ms Leena George — — 94959 35932
Ms Malathy S. — — 99952 24584
Ms Mini K Nair — — 94965 33105
Ms Nisha Varghese — — 98966 50359
Ms Nitha P S — — 94964 53177
Ms Priya Balan — — 94965 33105
Ms Raji Mathew — — 94965 33105
Ms Renu C R — — 95625 70675
Ms Shalmol S. — — 94969 37115

OFFICE STAFF (Name — Phone)
Mr George Kutty — 94004 96040
Mr Robin P Joseph — 96050 76806
Ms Manjusha S — 80765 85452
Ms Sajila Mariam Sunny — 80987 65195
Ms Aswathy P — 80756 85452
Mr Vaishakh S — 81118 50813

ACCOUNTANTS (Name — Phone)
Ms Celia Antony — 83040 55402
Ms Ajitha Kumari P R — 88484 87352
Ms Maghalin M — 80750 51914

LIBRARIANS (Name — Phone)
Mr Rollin Fernandez — 94471 13933
Ms Lekshmi J Hari — 94965 33105
Ms Sreekutty C S — 80896 49392

NON-TEACHING STAFF (Name — Phone)
Sr Rosina Kanatte — 95695 96595
Mr Padmakumar V G — 96450 82136
Mr Santhosh A — 94472 04302
Mr Sajan V A — 94960 91748
Mr Sreelal S V — 95605 12348
Mr Thomas John — 94472 04461
Mr Jijin V P — 98946 33620
Mr Suresh R — 94476 49600
Mr Sudheesh R — 94462 11775
Mr Padmakumar K — 97473 24465
Mr Praveen M — 94951 03676
Mr Bidhun B P — 94951 23167
Mr Anoop A S — 94951 00353
Mr Ajesh Kumar V A — 94951 00353
Mr Girish Kumar — 94951 00353
Mr Anilkumar B — 94951 00353
Mr Gopakumar K — 94967 04462
Ms Bindhu M — 97453 75474
Mr Anilkumar R — 94965 33105
Ms Shyamala N — 95675 60219
Ms Usha Kumari — 94965 33105
Ms Sheeba R — 94965 33105
Ms Preetha J — 73090 69330
Ms Kavitha K R — 97473 59117
Ms Dhanya T — 97473 59117
Ms Suma C — 73563 57297
Ms Pournami A — 94965 33105
Ms Archana N — 94965 33105
Ms Renjini S U — 88477 36527
Ms Subha K L — 94965 33105
Ms Jayakumari A T — 94965 33105
Ms Beatrice Rex H — 94965 33105
Ms Sheeja Thayil G K — 94965 33105
Mr Sujit Das — 94965 33105
Ms Sheeja R — 70122 91706
Ms Anila S — 94965 33105
Mr Prakash Babu — 94965 38171

— — — — — — — — — — — — — — — — — — — —
ACADEMIC CALENDAR (2025–2026)

JUNE 2025 — Events
• 02 Mon: School Reopening for Classes I–XII; blessing of buses/classrooms; class leader selection; orientation for all classes
• 03 Tue: Orientation for all classes
• 04 Wed: Election of Captains; selection for Clubs & Squads; UKG classes start; PTM & Parent Rep election (UKG)
• 05 Thu: LKG classes start; Orientation/PTM & Parent Rep election (LKG); Environment Day (Eco Club); Assembly (Junior School); Election of Junior School Leader
• 06 Fri: Bakrid
• 09 Mon: Election of School Leader; Academic Award Day
• 10 Tue: Selection of School Basketball Team
• 11 Wed: Investiture Ceremony; Selection of School Cricket Team
• 12 Thu: Selection of School Football Team; Submission of composition (Classes X & XII)
• 13 Fri: Holy Mass; Selection of School Swimming Team
• 16 Mon: PTA GBM I–V (8:30–10:30); PTA GBM VI–XII (11:30–13:30)
• 17 Tue: Assembly I & III (FN); Assembly II & IV (AN)
• 18 Wed: Assembly V & VII (FN); Assembly VI & VIII (AN)
• 19 Thu: Inter-house Basketball; Assembly IX (FN) & X (AN)
• 20 Fri: Monthly Quiz
• 21 Sat: Yoga Day
• 24 Tue: Assembly I & III (FN); Assembly II & IV (AN)
• 25 Wed: Assembly V & VII (FN); Assembly VI & VIII (AN)
• 26 Thu: Inter-house Basketball; Assembly IX (FN) & X (AN)
• 27 Fri: Class LA
• 30 Mon: Inter-house Football; Assembly UKG (AN); Submission of Book Review

JULY 2025 — Events
• 01 Tue: National Doctors’ Day; Assembly I & III (FN) and II & IV (AN)
• 02 Wed: Assembly V & VIII (FN) and VI, VII & VIII (AN)
• 03 Thu: Composition submission (IX & XI); Inter-house Basketball; Assembly IX (FN) & X (AN)
• 04 Fri: LA Fest Preparation
• 05 Sat: LA FEST
• 06 Sun: Muharram
• 07 Mon: Assembly LKG (FN); Assembly UKG (AN); Composition submission (VI–VIII)
• 08 Tue: L’Talentum (Junior School)
• 09 Wed: L’Talentum (Junior School)
• 10 Thu: Assembly IX (FN); Assembly X (AN)
• 11 Fri: Holy Mass; Composition submission (III–V)
• 14–18 Mon–Fri: Midterm exam (X & XII) and Unit Tests (I–IX & XI)
• 21 Mon: Assembly LKG (FN); Assembly UKG (AN)
• 22 Tue: Assembly I & III (FN); II & IV (AN)
• 23 Wed: Assembly V & VII (FN); VI & VIII (AN)
• 24 Thu: Karkidaka Vavu
• 25 Fri: Composition submission (I & II); Class LA
• 26 Sat: Open House LKG–XII
• 28–29 Mon–Tue: L’Talentum (Senior School); Assemblies LKG (FN) & UKG (AN)
• 30 Wed: Assembly I & III (FN); II & IV (AN); Special Assembly (Feast of St Ignatius); Submission of Book Review
• 31 Thu: Feast of St Ignatius of Loyola (Patron Saint)

AUGUST 2025 — Events (H=Holiday, C=Class)
• 01 Fri (C): Holy Mass
• 02–03 Sat–Sun (H)
• 04 Mon (C): First Mid-term Exams start (I–IX & XI); Assembly LKG (FN); First Term Exams for X (ICSE & CBSE) begin; Assembly UKG (AN)
• 07 Thu (C): First Term Exams for ISC & CBSE XII begin
• 08 Fri (C): Club Activities
• 14 Thu (C): End of First Term Exams for X & XII; Independence Day celebration
• 15 Fri (H): Independence Day
• 18 Mon (C): Composition submission (VI–VIII); Assembly LKG (FN); Assembly UKG (AN)
• 19 Tue (C): Assembly I & III (FN); I & IV (AN)
• 20 Wed (C): Assembly V & VI (FN); VI & VII (AN)
• 21 Thu (C): Assembly IX (FN); X (AN)
• 23 Sat (C): Annual Sports Day
• 28 Thu (H): Ayyankali Jayanthi
• 29 Fri (C): Onam Special Assembly
• 30 Sat (H): School closes for Onam Holidays
• 31 Sun (H)

SEPTEMBER 2025 — Events
• 01–07 Mon–Sun (H)
• 04 Thu (H): Onam
• 05 Fri (H): Milad-e-Sherif
• 08 Mon (C): School reopens after Onam; Assembly LKG (FN); Assembly UKG (AN)
• 09 Tue (C): Assembly I & III (FN)
• 10 Wed (C): Assembly II & IV (AN); Assembly V & VII (FN); Assembly VI & VIII (AN)
• 11 Thu (C): Assembly IX (FN) & X (AN)
• 12 Fri (C): Holy Mass; Teachers’ Day Special Assembly; Composition submission (I, II, IX & XI)
• 13 Sat (C): Open House LKG–XII
• 14 Sun (H): Sri Krishna Jayanthi
• 15 Mon (C): Unit test for X & XII; Assembly LKG (FN); Assembly UKG (AN)
• 16 Wed (C): Assembly I & III (FN); II & IV (AN)
• 17 Wed (C): Assembly V & VII (FN); VI & VIII (AN)
• 18 Thu (C): Assembly IX (FN) & X (AN)
• 19 Fri (C): L’ Spectra
• 21 Sun (H): Sree Narayana Guru Samadhi Day
• 22 Mon (C): Assembly LKG (FN); Assembly UKG (AN)
• 23 Tue (C): Assembly I & III (FN)
• 24 Wed (C): Assembly II & IV (AN); Assembly V & VII (FN); Assembly VI & VIII (AN)
• 25 Thu (C): Club Activities; Assembly IX (FN) & X (AN)
• 26–27 Fri–Sat (C/H): Loyola Cup Basketball Tournament (Fri C; Sat H); Class LA (Fri)
• 29 Mon (C): Assembly LKG (FN); Assembly UKG (AN)
• 30 Tue (C): Assembly I & III (FN); II & IV (AN); Submission of Book Review

OCTOBER 2025 — Events (H/C)
• 01 Wed (H): Mahanavmi
• 02 Thu (H): Gandhi Jayanthi, Vijaya Dashmi
• 03 Fri (C): Holy Mass
• 06 Mon (C): Assembly LKG (FN); Assembly UKG (AN)
• 07 Tue (C): Assembly I & III (FN)
• 08 Wed (C): Assembly II & IV (AN); Assembly V & VII (FN)
• 09 Thu (C): Assembly VI & VIII (AN)
• 10 Fri (C): Assembly X (AN)
• 13 Mon (C): First Term Exams begin (I–IX & XI)
• 17 Fri (C): Deepavali celebration
• 18 Sat (H): Open House for X & XII
• 20 Mon (H): Deepavali
• 23 Thu (C): Assembly X
• 25 Sat (H): Open House
• 28 Tue (C): End of First Term Exams (I–IX & XI)
• 29 Wed (C): Club Activities
• 30 Thu (C): Painting Day
• 31 Fri (C): St Rodriguez’s Day; Special Assembly for Non-teaching Staff; Class LA

NOVEMBER 2025 — Events (H/C)
• 01 Sat (H): Kerala Piravi
• 03 Mon (C): Assembly LKG (FN); Assembly UKG (AN); Composition submission (X & XII)
• 04 Tue (C): Assembly I & III (FN); Assembly II & IV (AN)
• 05 Wed (C): Assembly V & VII (FN); Assembly VI & VIII (AN)
• 06 Thu (C): Assembly IX (FN) & X (AN)
• 07 Fri (C): Holy Mass; Composition submission (III–VIII)
• 08 Sat (H): ZEST (Parents’ Carnival)
• 10 Mon (C): Assembly LKG (FN); Assembly UKG (AN); Composition submission (III–V)
• 11 Tue (C): Assembly I & II (FN); Assembly II & IV (AN)
• 12 Wed (C): Assembly V & VII (FN); Assembly VI & VIII (AN)
• 13 Thu (C): Second Term exam for ICSE X; Assembly IX (FN); Composition submission (I, II, IX & XI)
• 14 Fri (H): Children’s Day Special Assembly
• 15 Sat (H): Open House LKG–IX & XI
• 17 Mon (C): Assembly LKG (FN); Assembly UKG (AN)
• 18 Tue (C): Assembly I & III (FN)
• 19 Wed (C): Assembly II & IV (AN)
• 20 Thu (C): Assembly V & VII (FN); Assembly VI & VII (AN); Second Term Exam for CBSE X, ISC XI & CBSE XII
• 21 Fri (C): Monthly Quiz
• 24 Mon (C): Assembly LKG (FN); Assembly UKG (AN)
• 25 Wed (C): Assembly I & III (FN)
• 26 Wed (C): Assembly II & IV (AN); Assembly V & VII (FN); Assembly VI & VIII (AN); End of Second Term Exams for X & XII
• 27 Thu (C): Submission of Book Review
• 28–29 Fri–Sat (C): Annual Day (two days)
• 30 Sun (H)

DECEMBER 2025 — Events (H/C)
• 01 Mon (C): Assembly LKG (FN); Assembly UKG (AN)
• 02 Tue (C): Assembly I & III (FN); Assembly II & IV (AN)
• 03 Wed (C): Assembly V & VII (FN); Assembly VI & VIII (AN)
• 04 Thu (C): Assembly IX
• 05 Fri (C): Holy Mass; Submission of Personal Magazine (X & XII)
• 08 Mon (C): First Pre-Board ICSE X; Assembly LKG (FN); Assembly UKG (AN)
• 09 Tue (C): Assembly I & III (FN); Assembly II & IV (AN)
• 10 Wed (C): Assembly V & VII (FN); Assembly VI & VIII (AN)
• 11 Thu (C): First Pre-Board CBSE X & XII and ISC XII; Assembly IX (FN)
• 15–18 Mon–Thu (C): Mid-Term Exams (IX & XI) and Unit Tests (I–VIII)
• 19 Fri (C): Christmas Special Assembly
• 20 Sat (H): Christmas Holidays begin
• 25 Thu (H): Christmas
• 30 Tue (C): Submission of Book Review
• 31 Wed (C)

JANUARY 2026 — Events (H/C)
• 01 Thu (C): New Year’s Day
• 02 Fri (H): Mannam Jayanti
• 05 Mon (C): Start of Second Pre-Board Exams (X & XII); Assembly LKG (FN); Assembly UKG (AN)
• 06 Tue (C): Assembly I & III (FN); Assembly II & IV (AN)
• 07 Wed (C): Assembly V & VIII (FN); Assembly VI & VIII (AN)
• 08 Thu (C): Assembly IX (FN)
• 09 Fri (C): Holy Mass; Submission of Personal Magazine (I–IX & XI)
• 12 Mon (C): Assembly LKG (FN); Assembly UKG (AN)
• 13 Tue (C): Assembly I & III (FN); Assembly II & IV (AN)
• 14 Wed (C): Assembly V & VIII (FN); Assembly VI & VIII (AN)
• 16 Fri (C): Start of Second Term Exam ICSE IX; End of First Pre-Boards; Monthly Quiz
• 17 Sat (H): Kindergarten Grandparents’ Day
• 19–23 Mon–Fri (C): Prayer Service for Class X (Mon); Second Mid-Term Exams (I–VIII) all week
• 20 Tue (C): Farewell for Class XII
• 23 Fri (C): Start of Second Term Exams for CBSE IX & XI and ISC XI
• 24 Sat (H): Open House for X & XII
• 26 Mon (H): Republic Day
• 27–28 Tue–Wed (C): Assembly I & III (FN); II & IV (AN) ; Assembly V & VIII (FN); VI & VIII (AN)
• 30 Fri (C): Martyrs’ Day; End of Second Term Exams for IX & XI; Submission of Book Reviews; Class LA
• 31 Sat (H)

FEBRUARY 2026 — Events (H/C)
• 02 Mon (C): Classes begin for incoming X & XII; Assembly LKG (FN); Assembly UKG (AN)
• 03 Tue (C): Assembly I & III (FN); Assembly II & IV (AN)
• 04 Wed (C): Assembly V & VII (FN); Assembly VI & VIII (AN)
• 05 Thu (C): Holy Mass; Composition submission (I–V); Club Activities
• 06 Fri (C): Release of Personal Magazine & Reading Legends Awards
• 08 Sun (H)
• 09 Mon (C): Assembly LKG (FN); Assembly UKG (AN)
• 10 Tue (C): Assembly I & III (FN); Assembly II & IV (AN)
• 11 Wed (C): Assembly V & VII (FN); Assembly VI & VIII (AN)
• 12 Thu (C): Composition submission (VI–VIII)
• 13 Fri (C): Music Day — Vocal
• 14 Sat (H): Open House
• 16–18 Mon–Wed (C): Evaluation of Extracurricular Activities
• 19 Thu (C): Monthly Quiz
• 20 Fri (C): Music Day — Instrumental
• 22 Sun (H)
• 23–27 Mon–Fri (C): Assemblies (LKG/UKG; I–IV; V–VII; VI–VIII); Tik-Tik Life Mega Quiz (26 Thu); Class LA (27 Fri)

MARCH 2026 — Events (H/C)
• 03 Tue (H): Attukal Pongala
• 06 Fri (C): Holy Mass
• 16 Mon (C): Start of Second Term Exams (Classes I–VIII)
• 31 Tue (C): End of Second Term Exams (Classes I–VIII)

— — — — — — — — — — — — — — — — — — — —
BUS ROUTES & TIMINGS (AM pickup toward Loyola / PM drop from Loyola)

BUS 1 (Praveen — 99471 70571)
AM 06:40 — Loyola — PM 04:45
AM 07:10 — Vazhuthacaud — PM 03:40
AM 07:15 — Radio Station — PM 03:45
AM 07:20 — Jagathy — PM 03:50
AM 07:25 — Arwa Gardens — PM 03:55
AM 07:30 — Kunjalummoodu — PM 03:00
AM 07:32 — Papannamcode — PM 03:05
AM 07:35 — Kaimanam — PM 03:10
AM 07:37 — Karamana — PM 03:15
AM 07:40 — Kailas — PM 03:20
AM 07:45 — Killippallam — PM 03:25
AM 08:15 — Loyola — PM 03:15

BUS 2 (Padmakumar K — 97473 24465)
AM 07:00 — Loyola — PM 04:55
AM 07:05 — Valiathura Jn — PM 04:50
AM 07:10 — Valiathura Vidhya Gardens — PM 04:15
AM 07:15 — Kallummoodu Jn (new) — PM 04:05
AM 07:20 — Poonthura Market Jn — PM 04:00
AM 07:25 — Thiruvallom — PM 04:05
AM 07:30 — Muttathara — PM 04:10
AM 07:35 — Ambalathara Jn — PM 04:15
AM 07:40 — Ambalathara U.P.S — PM 04:35
AM 07:45 — Kallattumukku — PM 04:30
AM 07:50 — Kamaleswaram — PM 04:25
AM 08:00 — Balavan Nagar — PM 03:45
AM 08:05 — UAE Consulate — PM 03:40
AM 08:10 — Fort H.S. — PM 03:30
AM 08:15 — Loyola — PM 03:15

BUS 3 (Binol — 96335 49324)
AM 06:50 — Loyola — PM 04:30
AM 07:25 — Kochuveli Railway Station — PM 03:55
AM 07:30 — All Saints’ — PM 03:50
AM 07:35 — Chacka ITI — PM 03:45
AM 07:40 — Pettah Temple — PM 03:42
AM 07:45 — Chayakudam Lane — PM 03:41
AM 07:50 — Kannammoola Bridge — PM 03:40
AM 07:55 — Burma Road — PM 03:37
AM 08:00 — Kumarapuram Jn — PM 03:35
AM 08:05 — Tagore Gardens — PM 03:30
AM 08:10 — Medical College — PM 03:25
AM 08:15 — Loyola — PM 03:15

BUS 4 (Jijin — 98469 33620)
AM 07:00 — Loyola — PM 04:20
AM 07:20 — Chacka — PM 04:05
AM 07:25 — Manava Nagar — PM 04:00
AM 07:30 — Enjakkal — PM 03:55
AM 07:32 — Subhash Nagar — PM 03:50
AM 07:35 — Padinjarethakk — PM 03:45
AM 07:37 — Pallikulangara (Library) — PM 03:40
AM 07:40 — Pallikulangara (NSS) — PM 03:37
AM 07:42 — Pettah Post Office — PM 03:35
AM 08:15 — Loyola — PM 03:15

BUS 5 (Sudheesh — 94961 81275)
AM 07:00 — Loyola — PM 04:20
AM 07:30 — Law College — PM 03:50
AM 07:35 — Varamabassery — PM 03:45
AM 07:40 — Wiranda Jn — PM 03:40
AM 07:45 — Vadayakkadu — PM 03:35
AM 07:50 — PT Chacko Nagar — PM 03:30
AM 07:55 — Neerazhi Lane — PM 03:25
AM 08:00 — Kochullor — PM 03:20
AM 08:05 — Pongummood — PM 03:15
AM 08:10 — Chenthiy — PM 03:25
AM 08:15 — Kallampally — PM 03:20
AM 08:15 — Loyola — PM 03:15

BUS 6 (Sreelal — 96054 12348)
AM 07:00 — Loyola — PM 04:35
AM 07:05 — Valiathura Jn — PM 04:30
AM 07:10 — Sreerangam Lane — PM 04:25
AM 07:15 — Sasthamangalam — PM 04:20
AM 07:20 — TTC — PM 04:15
AM 07:25 — Saraswathy Nilayam — PM 04:10
AM 07:30 — Jawahar Nagar — PM 04:05
AM 07:35 — Devaswom Board — PM 04:00
AM 07:40 — YMIR — PM 03:55
AM 07:45 — Manthancode — PM 03:50
AM 07:50 — PMG — PM 03:45
AM 07:55 — Plammoodu — PM 03:40
AM 08:15 — Loyola — PM 03:15

BUS 7 (Santhosh — 94472 04328)
AM 06:35 — Loyola — PM 04:45
AM 07:20 — Perukavu — PM 04:40
AM 07:25 — Mangattukadavu — PM 04:35
AM 07:30 — Puthankada — PM 04:30
AM 07:32 — Poojaapura — PM 04:25
AM 07:35 — Choorayil — PM 04:20
AM 07:37 — Vijaya Mills — PM 04:10
AM 07:40 — Pallimukku — PM 03:55
AM 07:40 — SK Hospital — PM 03:50
AM 07:50 — Edapazhinji — PM 03:45
AM 08:00 — Cotton Hill — PM 03:40
AM 08:15 — Loyola — PM 03:15

BUS 8 (Sumesh — 99476 49960)
AM 06:45 — Loyola — PM 04:45
AM 07:00 — Vettamukku — PM 04:15
AM 07:05 — PTP Nagar — PM 04:10
AM 07:10 — Arappura — PM 04:05
AM 07:12 — Lake View Lane — PM 04:00
AM 07:14 — Vattiyoorkavu — PM 03:55
AM 07:15 — Manjadimoodu — PM 03:50
AM 07:17 — Kanjirampara — PM 03:45
AM 07:20 — Maruthumkuzhy — PM 03:40
AM 07:25 — Pipinmoodu — PM 03:35
AM 07:30 — SAP Camp — PM 03:30
AM 07:32 — Latex Ln — PM 03:25
AM 07:35 — JES Vasantham — PM 03:20
AM 07:40 — Museum — PM 03:15
AM 08:15 — Loyola — PM 03:15

BUS 9 (Sheeba — 99958 47151)
AM 06:30 — Loyola — PM 04:25
AM 06:40 — Edavakode — PM 04:20
AM 06:50 — Parottukonam — PM 04:15
AM 07:00 — Paruthippara — PM 04:10
AM 07:05 — Muttada — PM 04:05
AM 07:10 — Vayalikada — PM 04:00
AM 07:15 — Cheshire Home — PM 03:55
AM 07:20 — Kuravankonam Market — PM 03:50
AM 07:25 — Kuravankonam Jn — PM 03:45
AM 07:30 — Welgate — PM 03:40
AM 07:35 — KV Potten — PM 03:35
AM 07:40 — Big Bazaar — PM 03:30
AM 07:45 — Bapuji Nagar — PM 03:25
AM 07:50 — Panchayath Office — PM 03:20
AM 07:55 — Prasanth Nagar — PM 03:15
AM 08:00 — Priyadarshini Nagar — PM 03:15
AM 08:15 — Loyola — PM 03:15

BUS 10 (Midhun — 96054 21376)
AM 07:00 — Loyola — PM 04:40
AM 07:05 — East Fort (Attakulangara) — PM 04:35
AM 07:10 — Sreevaraham — PM 04:30
AM 07:15 — Vazhapally — PM 04:25
AM 07:20 — Ayurvedic College — PM 04:20
AM 07:25 — Statue — PM 04:15
AM 07:30 — Palayam — PM 04:10
AM 07:35 — Marappalam — PM 04:05
AM 07:40 — TKD - I — PM 04:00
AM 07:45 — TKD - II — PM 03:55
AM 07:50 — Muttada Jn — PM 03:50
AM 07:55 — Muttada Church — PM 03:45
AM 08:00 — G M College — PM 03:40
AM 08:15 — Loyola — PM 03:15

BUS 11 (Anilkumar B — 98952 49006)
AM 07:05 — Loyola — PM 04:25
AM 07:20 — Keraladithyapuram — PM 04:10
AM 07:25 — Mannanthala — PM 04:05
AM 07:30 — Mannanthala Press — PM 04:00
AM 07:35 — Maruthoor — PM 03:55
AM 07:40 — Mukkola — PM 03:50
AM 07:45 — Kottamugal — PM 03:45
AM 07:50 — Sep Jn — PM 03:40
AM 07:55 — Nalanchira — PM 03:35
AM 08:00 — Paruthippara — PM 03:30
AM 08:05 — Kesavadasapuram — PM 03:25
AM 08:10 — Idiyadikkode Temple — PM 03:20
AM 08:15 — Pulayanar Kottah — PM 03:15
AM 08:15 — Loyola — PM 03:15

BUS 12 (Xavier — 73562 20136)
AM 07:05 — Loyola — PM 04:15
AM 07:35 — General Hospital — PM 04:00
AM 07:35 — Vanchiyoor — PM 03:55
AM 07:40 — Pattoor Church — PM 03:50
AM 07:40 — EMS Nagar — PM 03:55
AM 07:45 — Moolavilakam — PM 03:50
AM 07:50 — Thampuranmukku — PM 03:45
AM 07:50 — Gowreesapattom — PM 03:40
AM 07:50 — Kottara Lane — PM 03:35
AM 07:55 — GG Hospital — PM 03:30
AM 08:00 — Puthupalli Lane — PM 03:25
AM 08:15 — Loyola — PM 03:15

BUS 13 (Thomas John — 94472 04461)
AM 07:00 — Loyola — PM 04:25
AM 07:30 — Rose Gardens — PM 04:00
AM 07:35 — Silver Hills — PM 03:55
AM 07:35 — Venpalavattom — PM 03:55
AM 07:40 — Lords Hospital — PM 03:50
AM 07:45 — Arasummoodu — PM 03:45
AM 07:42 — Anayara L.P.S. — PM 03:45
AM 07:45 — Kallummoodu — PM 03:40
AM 07:45 — Pettah Market — PM 03:35
AM 07:50 — Avittom Road — PM 03:30
AM 08:15 — Loyola — PM 03:15

BUS 14 (Pournami — 95446 26391)
AM 07:00 — Loyola — PM 04:35
AM 07:20 — Railway Bridge — PM 04:25
AM 07:25 — Ambalathumukku — PM 04:00
AM 07:40 — Palpu Road — PM 03:55
AM 07:45 — Lulu Mall — PM 03:50
AM 07:50 — Technopark Back Gate — PM 03:45
AM 08:00 — Thrippadapuram — PM 03:35
AM 08:15 — Loyola — PM 03:15

BUS 15 (Archana — 99478 31060)
AM 07:00 — Loyola — PM 04:30
AM 07:20 — Vazhiyala — PM 04:00
AM 07:35 — Peroorkada (Police Station) — PM 03:55
AM 07:40 — Marappalam (Church) — PM 03:55
AM 07:45 — Kesavadasapuram — PM 03:55
AM 07:50 — Toll Jn — PM 03:50
AM 07:55 — Kowdiar — PM 03:50
AM 08:00 — Pandit Colony — PM 03:45
AM 08:05 — Oolloor — PM 03:40
AM 08:10 — Ulloor — PM 03:35
AM 08:15 — Thiruvickramangalam — PM 03:30
AM 08:15 — Latex — PM 03:25
AM 08:15 — SNDP — PM 03:20
AM 08:15 — Cheruvickal — PM 03:20
AM 08:15 — Loyola — PM 03:15

BUS 16 (Dhanya — 89214 84109)
AM 07:00 — Loyola — PM 04:25
AM 07:15 — Water Works — PM 04:10
AM 07:20 — Sreemoolam Club — PM 04:05
AM 07:30 — Police Training Ground — PM 04:05
AM 07:30 — Mettukada — PM 04:00
AM 07:30 — Bakery Junction — PM 03:55
AM 07:35 — Nalumukku — PM 03:50
AM 07:40 — Pallimukku — PM 03:45
AM 07:45 — Nanthencode Jn — PM 03:45
AM 07:50 — Panjappura — PM 03:40
AM 07:55 — Panjab National Bank — PM 03:35
AM 08:15 — Loyola — PM 03:15

BUS 17 (Kavitha — 97473 59117)
AM 07:05 — Loyola — PM 04:20
AM 07:10 — Puthenpura — PM 04:15
AM 07:15 — St Andrews — PM 04:10
AM 07:20 — Marian Engg. College — PM 04:05
AM 07:25 — Menonkuam — PM 03:55
AM 07:30 — Jyothis — PM 03:55
AM 07:35 — Kariyil Nalumukku — PM 03:55
AM 07:40 — Railway Over Bridge — PM 03:45
AM 07:45 — Kazhakottam (Police Station) — PM 03:45
AM 07:50 — Ambalathinkara — PM 03:45
AM 07:55 — Honda Service Station — PM 03:40
AM 08:00 — Green Field Stadium — PM 03:40
AM 08:05 — Karyavattom Jn — PM 03:35
AM 08:10 — Gurumandiram — PM 03:30
AM 08:15 — Pangappara H C — PM 03:25
AM 08:15 — Mankuzhi — PM 03:20
AM 08:15 — Chavadimukku — PM 03:15

BUS 18 (Bindhu — 97453 39015)
AM 06:55 — Loyola — PM 04:25
AM 07:25 — SFS Cyber Gate — PM 04:05
AM 07:27 — Sainik School — PM 04:00
AM 07:30 — Chanthavila — PM 03:55
AM 07:35 — Thonnakkal — PM 03:50
AM 07:40 — Mangattukonam — PM 03:45
AM 07:45 — Gandhipuram — PM 03:40
AM 07:50 — Chavadimukku — PM 03:35
AM 08:15 — Loyola — PM 03:15

BUS 19 (Preetha — 79070 69390)
AM 06:55 — Loyola — PM 04:30
AM 07:05 — Kattayikonam — PM 04:25
AM 07:10 — Ariyittouknam — PM 04:20
AM 07:15 — Santhigiri Ashramam — PM 04:05
AM 07:20 — Pothencode — PM 04:00
AM 07:25 — Plamooodu — PM 03:50
AM 07:30 — Aiyrooppara — PM 03:45
AM 07:35 — Choorimoodu — PM 03:45
AM 07:40 — Santhipuram — PM 03:40
AM 07:45 — Njandoorkonam — PM 03:40
AM 07:50 — Melemukku — PM 03:35
AM 07:55 — Powdikonam — PM 03:30
AM 08:00 — Societyumukku — PM 03:25
AM 08:05 — Kattavila — PM 03:20
AM 08:10 — Chellamangalam — PM 03:20
AM 08:15 — Kariyam — PM 03:15
AM 08:15 — Loyola — PM 03:15

BUS 20 (Renjini — 98477 39257)
AM 07:35 — Loyola — PM 03:55
AM 07:45 — MGM — PM 03:45
AM 07:55 — Kazhakuttom Jn — PM 03:35
AM 08:15 — Loyola — PM 03:15

BUS 21 (Sheeja — 95449 40473)
AM 07:00 — Loyola — PM 04:15
AM 07:05 — Mangalapuram — PM 04:10
AM 07:10 — Pallippuram — PM 04:05
AM 07:15 — Kaniyapuram — PM 04:00
AM 07:20 — Vetturoad — PM 03:55
AM 07:25 — Technopark (Gate No. 3) — PM 03:55
AM 07:30 — Attinkuzhy — PM 03:55
AM 07:35 — Mukkolackal — PM 03:50
AM 07:40 — Kulathoor Jn — PM 03:45
AM 08:15 — Loyola — PM 03:15

BUS 22 (Remya — 90486 37266)
AM 07:15 — Loyola — PM 04:10
AM 07:20 — Karyavattom — PM 03:50
AM 07:25 — LNCP — PM 03:45
AM 07:30 — Kurisady Jn — PM 03:45
AM 07:35 — Pullannivila — PM 03:45
AM 07:40 — Thandithala — PM 03:45
AM 07:45 — Andoorkonam — PM 03:41
AM 07:50 — Chettikunnam — PM 03:40
AM 07:55 — Pothencode — PM 03:40
AM 08:00 — Aniyoor Jn — PM 03:40
AM 08:05 — Madanvazhanthy — PM 03:40
AM 08:10 — Udayagiri — PM 03:35
AM 08:15 — Vencodue — PM 03:35
AM 08:15 — Chekkalamukku — PM 03:15
AM 08:15 — Loyola — PM 03:15

BUS 23 (Subha — 85470 83257)
AM 07:00 — Loyola — PM 04:10
AM 07:05 — Alathara — PM 04:05
AM 07:10 — NISH — PM 04:00
AM 07:15 — Arasumoodu Jn — PM 03:55
AM 07:20 — Monvila Jn — PM 03:50
AM 07:25 — Emaus Church — PM 03:45
AM 08:15 — Loyola — PM 03:15

— — — — — — — — — — — — — — — — — — — —
DOCUMENT MARKER: LOYOLA SCHOOL DIARY 2025–2026 (end of knowledgebase)

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
    <div className="bg-black min-h-screen flex flex-col items-center font-abc-repro font-normal text-sm text-white p-8 relative overflow-hidden">
      {/* ambient gradient glow background */}
      <div aria-hidden className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.35),transparent_60%)] blur-3xl"></div>
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.35),transparent_60%)] blur-3xl"></div>

      <SimliHeaderLogo />

      {/* Page heading */}
      <h1 className="mt-4 mb-2 text-center text-2xl md:text-3xl lg:text-4xl font-abc-repro-mono font-bold tracking-tight">
        Loyola Information Chatbot
      </h1>

      {/* Top-right area intentionally left blank for Loyola site (remove Simli GitHub link) */}
      <div className="flex flex-col items-center gap-6 w-full max-w-[1700px] p-4 md:p-6 pb-[40px] rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]">
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
