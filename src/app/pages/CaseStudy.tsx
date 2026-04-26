import { useParams, Link, Navigate } from "react-router";
import { projects } from "../data/projects";
import { ArrowLeft, ArrowUp, Layers, ThumbsUp, Heart, Mail } from "lucide-react";
import { ArrowsOut, ArrowsIn, CaretLeft, CaretRight, Plus, Minus } from "@phosphor-icons/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import predictArchitecture from "figma:asset/9d537f5cc6573164bde668097537f5d4460a2997.png";
import storyImage from "figma:asset/0418e59b0a42e10c2978165728c33ac9f5e7486e.png";
import storyImage1 from "figma:asset/42ddec3b3b3f0fcea97f963ff30bdc2d9fa927e0.png";
import storyImage2 from "figma:asset/7d6742cc0e7238c6630ddb4a8d10adc4ccef6883.png";
import storyImage3 from "figma:asset/dbbcc6b446f40326ac0658af0e618cf1372ed220.png";
import predictContextImage from "figma:asset/485b0e9763c9f09882949ad898f424a052b9318a.png";
import contentImage1 from "figma:asset/3aec6e0300112e1fb9394e5fbf8ade4a496a771b.png";
import contentImage2 from "figma:asset/41cd0bb93ca68087159f7bf0a5082e4af29039d2.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom Arrow Components
const CustomPrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05, x: -3 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-shadow duration-300"
      aria-label="Previous slide"
    >
      <motion.div
        whileHover={{ x: -2 }}
        transition={{ duration: 0.2 }}
      >
        <CaretLeft size={20} weight="bold" className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" />
      </motion.div>
    </motion.button>
  );
};

const CustomNextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05, x: 3 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-shadow duration-300"
      aria-label="Next slide"
    >
      <motion.div
        whileHover={{ x: 2 }}
        transition={{ duration: 0.2 }}
      >
        <CaretRight size={20} weight="bold" className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" />
      </motion.div>
    </motion.button>
  );
};

export default function CaseStudy() {
  const { id } = useParams<{ id: string }>();
  const project = id ? projects.find(p => p.id === id) : undefined;
  
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("cover");
  const [isManualClick, setIsManualClick] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoved, setIsLoved] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<string>("");
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState<number>(0);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isCarouselFullscreen, setIsCarouselFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fullscreenContainerRef = useRef<HTMLDivElement>(null);
  
  // Dynamic carousel and story images based on project
  const getProjectImages = (projectId: string | undefined) => {
    const imageMap: Record<string, { carouselImages: string[], longImage: string }> = {
      "ai-assisted-decision-platform": {
        carouselImages: [predictContextImage, storyImage1, storyImage2, storyImage3],
        longImage: storyImage
      },
      "enterprise-design-system": {
        carouselImages: [
          "https://images.unsplash.com/photo-1577976655502-85300c5ca2cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRlcnByaXNlJTIwZGVzaWduJTIwc3lzdGVtJTIwY29tcG9uZW50c3xlbnwxfHx8fDE3NzM5MDI3MzF8MA&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1606733803396-1d028f0e6f43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVSSUyMGNvbXBvbmVudCUyMGxpYnJhcnl8ZW58MXx8fHwxNzczOTAyNzMyfDA&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1625468743270-9c3c5b27933b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwZGVzaWduJTIwdG9rZW5zfGVufDF8fHx8MTc3MzkwMjczMnww&ixlib=rb-4.1.0&q=80&w=1080"
        ],
        longImage: "https://images.unsplash.com/photo-1663784294206-9b508132baf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMG1vbml0b3JpbmclMjB2ZXJ0aWNhbHxlbnwxfHx8fDE3NzM5MDI3NTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
      },
      "healthcare-patient-portal": {
        carouselImages: [
          "https://images.unsplash.com/photo-1762340916350-ad5a3d620c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwbmV0d29yayUyMHByb3RlY3Rpb258ZW58MXx8fHwxNzczODM0NjU3fDA&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1763144536757-d90b9144e6ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwdGhyZWF0JTIwbW9uaXRvcmluZ3xlbnwxfHx8fDE3NzM5MDI3MzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1559236790-4e54e81fa3c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6ZXJvJTIwdHJ1c3QlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzczOTAyNzMzfDA&ixlib=rb-4.1.0&q=80&w=1080"
        ],
        longImage: "https://images.unsplash.com/photo-1660836814985-8523a0d713b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwbmV0d29yayUyMHZlcnRpY2FsfGVufDF8fHx8MTc3MzkwMjc1NXww&ixlib=rb-4.1.0&q=80&w=1080"
      },
      "manav": {
        carouselImages: [
          "https://images.unsplash.com/photo-1634743556192-d19f0c69ff3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIUiUyMHRlY2hub2xvZ3klMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzczOTAyNzM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1763736809695-b92e4db67472?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbXBsb3llZSUyMG1hbmFnZW1lbnQlMjBzeXN0ZW18ZW58MXx8fHwxNzczOTAyNzM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1561480337-03eb1b6795a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JrZm9yY2UlMjBhbmFseXRpY3N8ZW58MXx8fHwxNzczOTAyNzM1fDA&ixlib=rb-4.1.0&q=80&w=1080"
        ],
        longImage: "https://images.unsplash.com/photo-1759663176274-6d3fa700b87a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXclMjBlbmZvcmNlbWVudCUyMGFuYWx5c2lzJTIwbG9uZ3xlbnwxfHx8fDE3NzM5MDI3NTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
      },
      "data-visualization-platform": {
        carouselImages: [
          "https://images.unsplash.com/photo-1723307061004-6e2e087deae1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW9zcGF0aWFsJTIwaW50ZWxsaWdlbmNlJTIwbWFwfGVufDF8fHx8MTc3MzkwMjczNXww&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1618847207931-c05e836bbdb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJhdGVnaWMlMjBhbmFseXNpcyUyMGdsb2JlfGVufDF8fHx8MTc3MzkwMjczNnww&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1688287632190-071ae4b3a129?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaXR1YXRpb25hbCUyMGF3YXJlbmVzcyUyMGNvbW1hbmR8ZW58MXx8fHwxNzczOTAyNzM2fDA&ixlib=rb-4.1.0&q=80&w=1080"
        ],
        longImage: "https://images.unsplash.com/photo-1598255417985-3f503fc36f0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW9zcGF0aWFsJTIwbWFwJTIwdmVydGljYWx8ZW58MXx8fHwxNzczOTAyNzU2fDA&ixlib=rb-4.1.0&q=80&w=1080"
      },
      "public-benefits-application": {
        carouselImages: [
          "https://images.unsplash.com/photo-1711655371218-7888ff2c6b75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aWxkbGlmZSUyMGNvbnNlcnZhdGlvbiUyMGZvcmVzdHxlbnwxfHx8fDE3NzM4MjQ5NDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1771746924362-dabd71478eff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBtYW5hZ2VtZW50JTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzM5MDI3MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1744835289606-6ee518cea962?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxodW1hbiUyMHdpbGRsaWZlJTIwY29uZmxpY3R8ZW58MXx8fHwxNzczOTAyNzM3fDA&ixlib=rb-4.1.0&q=80&w=1080"
        ],
        longImage: "https://images.unsplash.com/photo-1637267415513-2f06aae5bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBsYW5kc2NhcGUlMjB2ZXJ0aWNhbHxlbnwxfHx8fDE3NzM5MDI3NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
        },
      "enterprise-analytics-dashboard": {
        carouselImages: [
          "https://images.unsplash.com/photo-1708794666324-85ad91989d20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyZSUyMHRlY2hub2xvZ3klMjBhZHZpc29yeXxlbnwxfHx8fDE3NzM5MDI3Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1708794666324-85ad91989d20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGZhcm1pbmclMjBBSXxlbnwxfHx8fDE3NzM5MDI3Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1762609020059-4b9b0c4c03d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWF0aGVyJTIwZm9yZWNhc3QlMjBhZ3JpY3VsdHVyZXxlbnwxfHx8fDE3NzM5MDI3Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080"
        ],
        longImage: "https://images.unsplash.com/photo-1702896779536-1c44a8d3e390?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyZSUyMGZpZWxkJTIwdmVydGljYWx8ZW58MXx8fHwxNzczOTAyNzU2fDA&ixlib=rb-4.1.0&q=80&w=1080"
      },
      "ai-content-moderation": {
        carouselImages: [
          "https://images.unsplash.com/photo-1653136952516-f1362d7df156?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGluZGlhbiUyMHRpbWVrZWVwaW5nfGVufDF8fHx8MTc3MzkwMjczOXww&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1707057538324-40d244e86e17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWRpYyUyMGFzdHJvbm9teSUyMHZpc3VhbGl6YXRpb258ZW58MXx8fHwxNzczOTAyNzM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1631034339032-fb4566a49f01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXclMjBlbmZvcmNlbWVudCUyMHRlY2hub2xvZ3klMjBhbmFseXNpc3xlbnwxfHx8fDE3NzM5MDI3MzB8MA&ixlib=rb-4.1.0&q=80&w=1080"
        ],
        longImage: "https://images.unsplash.com/photo-1562164914-f71b2835e86b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwbWFudXNjcmlwdCUyMHZlcnRpY2FsfGVufDF8fHx8MTc3MzkwMjc1N3ww&ixlib=rb-4.1.0&q=80&w=1080"
      },
      "gupt": {
        carouselImages: [
          "https://images.unsplash.com/photo-1722254111234-512dfa9d749c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjcnlwdG9ncmFwaHklMjBhbmNpZW50fGVufDF8fHx8MTc3MzkwMjc0NHww&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1721378466934-68c57d15a6c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXBoZXIlMjBlbmNvZGluZyUyMHN5bWJvbHN8ZW58MXx8fHwxNzczOTAyNzQ0fDA&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1557853197-aefb550b6fdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnlwdG9ncmFwaGljJTIwcGF0dGVybnN8ZW58MXx8fHwxNzczOTAyNzQ0fDA&ixlib=rb-4.1.0&q=80&w=1080"
        ],
        longImage: "https://images.unsplash.com/photo-1562164914-f71b2835e86b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwbWFudXNjcmlwdCUyMHZlcnRpY2FsfGVufDF8fHx8MTc3MzkwMjc1N3ww&ixlib=rb-4.1.0&q=80&w=1080"
      },
      "kashi": {
        carouselImages: [
          "https://images.unsplash.com/photo-1763875018677-544233f257e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2FyZCUyMGdhbWUlMjBkZXNpZ258ZW58MXx8fHwxNzczOTAyNzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1593442808882-775dfcd90699?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBwaGlsb3NvcGh5JTIwbGVhcm5pbmd8ZW58MXx8fHwxNzczOTAyNzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1771588330614-2ce1d77588ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGdhbWUlMjBwaWVjZXN8ZW58MXx8fHwxNzczOTAyNzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080"
        ],
        longImage: "https://images.unsplash.com/photo-1733652403334-6e119ac614d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2FyZCUyMGdhbWUlMjB2ZXJ0aWNhbHxlbnwxfHx8fDE3NzM5MDI3NTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
      },
      "srujanalaya": {
        carouselImages: [
          "https://images.unsplash.com/photo-1762330467151-7f009206db90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc3Rvcnl0ZWxsaW5nJTIwcGxhdGZvcm18ZW58MXx8fHwxNzczOTAyNzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1670940830924-496d7dc998ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzYWNyZWQlMjBhcnR8ZW58MXx8fHwxNzczOTAyNzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1729370638927-1be1101d092e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGljb25vZ3JhcGh5JTIwZGlnaXRhbHxlbnwxfHx8fDE3NzM5MDI3NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
        ],
        longImage: "https://images.unsplash.com/photo-1771500873216-b23571c710dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJ0JTIwdmVydGljYWx8ZW58MXx8fHwxNzczOTAyNzU4fDA&ixlib=rb-4.1.0&q=80&w=1080"
      },
      "pravaha": {
        carouselImages: [
          "https://images.unsplash.com/photo-1725483733130-97bdc5250726?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaGFybWljJTIwZGVzaWduJTIwcGhpbG9zb3BoeXxlbnwxfHx8fDE3NzM5MDI3NDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1593442808882-775dfcd90699?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYyUyMGtub3dsZWRnZSUyMHBlZGFnb2d5fGVufDF8fHx8MTc3MzkwMjc0OHww&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1765572144265-8f7a7e1c8b14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGluZGlhbiUyMHdpc2RvbXxlbnwxfHx8fDE3NzM5MDI3NDh8MA&ixlib=rb-4.1.0&q=80&w=1080"
        ],
        longImage: "https://images.unsplash.com/photo-1562164914-f71b2835e86b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwbWFudXNjcmlwdCUyMHZlcnRpY2FsfGVufDF8fHx8MTc3MzkwMjc1N3ww&ixlib=rb-4.1.0&q=80&w=1080"
      },
      "education-learning-platform": {
        carouselImages: [
          "https://images.unsplash.com/photo-1762330917056-e69b34329ddf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBlZHVjYXRpb24lMjBwbGF0Zm9ybXxlbnwxfHx8fDE3NzM4NDA0NTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1758270704534-fd9715bffc0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbGVhcm5pbmclMjBzdHVkZW50c3xlbnwxfHx8fDE3NzM4Mzc3MjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1759884247381-d7222dd72dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW1vdGUlMjBlZHVjYXRpb24lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MzkwMjc0OXww&ixlib=rb-4.1.0&q=80&w=1080"
        ],
        longImage: "https://images.unsplash.com/photo-1759663176274-6d3fa700b87a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXclMjBlbmZvcmNlbWVudCUyMGFuYWx5c2lzJTIwbG9uZ3xlbnwxfHx8fDE3NzM5MDI3NTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
      },
      "fintech-mobile-banking": {
        carouselImages: [
          "https://images.unsplash.com/photo-1681826291722-70bd7e9e6fc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBiYW5raW5nJTIwYXBwfGVufDF8fHx8MTc3MzkwMjc1MHww&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1561525155-40a650192479?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjB0ZWNobm9sb2d5JTIwc21hcnRwaG9uZXxlbnwxfHx8fDE3NzM5MDI3NTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
          "https://images.unsplash.com/photo-1612351978641-ecdafe9caaa5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwcGF5bWVudHMlMjB1bmRlcmJhbmtlZHxlbnwxfHx8fDE3NzM5MDI3NTB8MA&ixlib=rb-4.1.0&q=80&w=1080"
        ],
        longImage: "https://images.unsplash.com/photo-1660836814985-8523a0d713b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwbmV0d29yayUyMHZlcnRpY2FsfGVufDF8fHx8MTc3MzkwMjc1NXww&ixlib=rb-4.1.0&q=80&w=1080"
      }
    };

    return imageMap[projectId || ""] || {
      carouselImages: [
        "https://images.unsplash.com/photo-1631034339032-fb4566a49f01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXclMjBlbmZvcmNlbWVudCUyMHRlY2hub2xvZ3klMjBhbmFseXNpc3xlbnwxfHx8fDE3NzM5MDI3MzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1675627453084-505806a00406?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwbW9uaXRvcmluZyUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NzM4NTgxMzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1495055154266-57bbdeada43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMGludGVsbGlnZW5jZXxlbnwxfHx8fDE3NzM5MDI3MzF8MA&ixlib=rb-4.1.0&q=80&w=1080"
      ],
      longImage: "https://images.unsplash.com/photo-1691435828932-911a7801adfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    };
  };

  const { carouselImages, longImage } = getProjectImages(project?.id);
  
  const { scrollYProgress } = useScroll();
  const progressBarScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for active section tracking
  useEffect(() => {
    const observerOptions = {
      rootMargin: '-120px 0px -60% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Skip observer updates if user just clicked a nav item
      if (isManualClick) {
        return;
      }

      // Find all intersecting sections
      const intersectingSections = entries.filter(entry => entry.isIntersecting);
      
      if (intersectingSections.length > 0) {
        // Get the section order
        const sectionOrder = ['cover', 'context', 'product-vision', 'user-research', 'design-direction', 'methods-processes', 'design-deliverables', 'analysis-impact', 'future-scope', 'credits'];
        
        // Find the topmost visible section based on scroll position
        let topmostSection = intersectingSections[0];
        let smallestTop = intersectingSections[0].boundingClientRect.top;
        
        intersectingSections.forEach(entry => {
          const entryTop = entry.boundingClientRect.top;
          // Find the section that's closest to the top of the viewport (but still visible)
          if (entryTop < smallestTop && entryTop >= -100) {
            smallestTop = entryTop;
            topmostSection = entry;
          }
        });
        
        const newActiveSection = topmostSection.target.id;
        
        // Only update if it's a valid section and different from current
        if (sectionOrder.includes(newActiveSection) && newActiveSection !== activeSection) {
          setActiveSection(newActiveSection);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    const sections = ['cover', 'context', 'product-vision', 'user-research', 'design-direction', 'methods-processes', 'design-deliverables', 'analysis-impact', 'future-scope', 'credits'];
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [isManualClick, activeSection]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();

    // Update active state
    setActiveSection(sectionId);
    setIsManualClick(true);

    // Clear any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Get the target element
    const targetElement = document.getElementById(sectionId);

    if (targetElement) {
      // Use scrollIntoView which respects CSS scroll-margin
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

    // Re-enable observer after scroll completes
    scrollTimeoutRef.current = setTimeout(() => {
      setIsManualClick(false);
    }, 800);
  };

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevImage = () => {
    const newIndex = (fullscreenImageIndex - 1 + carouselImages.length) % carouselImages.length;
    setFullscreenImageIndex(newIndex);
    setFullscreenImage(carouselImages[newIndex]);
  };

  const handleNextImage = () => {
    const newIndex = (fullscreenImageIndex + 1) % carouselImages.length;
    setFullscreenImageIndex(newIndex);
    setFullscreenImage(carouselImages[newIndex]);
  };

  // Zoom handlers for fullscreen image
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3)); // Max 3x zoom
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5)); // Min 0.5x zoom
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  // Reset zoom when opening fullscreen
  useEffect(() => {
    if (isFullscreen) {
      setZoomLevel(1);
      if (fullscreenContainerRef.current) {
        fullscreenContainerRef.current.scrollTop = 0;
      }
    }
  }, [isFullscreen]);
  
  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-primary/90 to-primary z-50 origin-left shadow-[0_1px_3px_rgba(0,82,255,0.4)]"
        style={{ scaleX: progressBarScaleX }}
      />

      <div className="pt-24 pb-32">
        {/* Hero Section with Parallax */}
        <motion.div 
          id="cover"
          className="relative w-full mb-6 lg:mb-20 overflow-hidden scroll-mt-52 lg:scroll-mt-32"
        >
          <div className="max-w-[1800px] mx-auto overflow-x-hidden">
            {/* Background Image with Overlay */}
            <div className="relative min-h-[85vh] flex items-end">
              <div className="absolute inset-0">
                <ImageWithFallback
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                {/* Multi-layer gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 xl:px-32 pt-6 pb-16 md:pb-20 lg:pb-24 max-w-[1600px] mx-auto">
                {/* Icon + Title */}
                <div className="flex items-center gap-5 md:gap-7 lg:gap-8 mb-8">
                  {/* Square Icon - Bigger with white border and centered icon */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-shrink-0 w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 bg-transparent backdrop-blur-sm border-[3px] md:border-[4px] border-white/90 rounded-lg shadow-[0_12px_40px_rgba(0,0,0,0.4)] flex items-center justify-center"
                  >
                    <Layers className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-18 xl:h-18 text-white" strokeWidth={2} />
                  </motion.div>
                  
                  {/* Title */}
                  <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[44px] md:text-[64px] lg:text-[80px] xl:text-[96px] font-medium leading-[1.05] tracking-[-0.04em] flex-1 text-white drop-shadow-2xl"
                    style={{ fontFeatureSettings: "'ss01' on" }}
                  >
                    {project.title}
                  </motion.h1>
                </div>

                {/* Description */}
                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[19px] md:text-[22px] lg:text-[26px] text-white/90 leading-[1.39] tracking-[-0.018em] max-w-4xl mb-12 drop-shadow-lg font-light"
                >
                  {project.description}
                </motion.p>

                {/* Tags */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="flex flex-wrap gap-2.5 mb-10"
                >
                  {project.tags.map((tag, index) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.4 + index * 0.1,
                        ease: [0.34, 1.56, 0.64, 1]
                      }}
                      className="text-[13px] px-3 py-1.5 bg-muted text-muted-foreground rounded-md font-medium tracking-[-0.01em] opacity-70"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Metadata - Enhanced Design */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-wrap gap-10 md:gap-16 pt-10 border-t border-white/15"
                >
                  <div className="space-y-2">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-bold">Category</p>
                    <p className="text-[22px] md:text-[24px] font-semibold tracking-[-0.02em] text-white">{project.category}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-bold">Year</p>
                    <p className="text-[22px] md:text-[24px] font-semibold tracking-[-0.02em] text-white">{project.year}</p>
                  </div>
                  <div className="space-y-2 max-w-md">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-bold">Role</p>
                    <p className="text-[22px] md:text-[24px] font-semibold tracking-[-0.02em] text-white leading-tight">{project.role}</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Sections - Refined Layout */}
        <div className="max-w-[1400px] mx-auto">
          {/* Mobile Sticky Index - Fixed below hero */}
          <div className="lg:hidden sticky top-20 z-40 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm">
            <div className="px-6 py-3">
              <div className="grid grid-cols-5 gap-x-6 gap-y-3.5 mb-2.5">
                <a
                  href="#cover"
                  onClick={(e) => handleNavClick(e, "cover")}
                  className={`text-center text-[15px] font-bold tabular-nums transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer ${
                    activeSection === "cover"
                      ? "text-primary scale-110"
                      : "text-muted-foreground/60 hover:text-foreground active:text-primary"
                  }`}
                >
                  00
                </a>
                <a
                  href="#context"
                  onClick={(e) => handleNavClick(e, "context")}
                  className={`text-center text-[15px] font-bold tabular-nums transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer ${
                    activeSection === "context"
                      ? "text-primary scale-110"
                      : "text-muted-foreground/60 hover:text-foreground active:text-primary"
                  }`}
                >
                  01
                </a>
                <a
                  href="#product-vision"
                  onClick={(e) => handleNavClick(e, "product-vision")}
                  className={`text-center text-[15px] font-bold tabular-nums transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer ${
                    activeSection === "product-vision"
                      ? "text-primary scale-110"
                      : "text-muted-foreground/60 hover:text-foreground active:text-primary"
                  }`}
                >
                  02
                </a>
                <a
                  href="#user-research"
                  onClick={(e) => handleNavClick(e, "user-research")}
                  className={`text-center text-[15px] font-bold tabular-nums transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer ${
                    activeSection === "user-research"
                      ? "text-primary scale-110"
                      : "text-muted-foreground/60 hover:text-foreground active:text-primary"
                  }`}
                >
                  03
                </a>
                <a
                  href="#design-direction"
                  onClick={(e) => handleNavClick(e, "design-direction")}
                  className={`text-center text-[15px] font-bold tabular-nums transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer ${
                    activeSection === "design-direction"
                      ? "text-primary scale-110"
                      : "text-muted-foreground/60 hover:text-foreground active:text-primary"
                  }`}
                >
                  04
                </a>
                <a
                  href="#methods-processes"
                  onClick={(e) => handleNavClick(e, "methods-processes")}
                  className={`text-center text-[15px] font-bold tabular-nums transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer ${
                    activeSection === "methods-processes"
                      ? "text-primary scale-110"
                      : "text-muted-foreground/60 hover:text-foreground active:text-primary"
                  }`}
                >
                  05
                </a>
                <a
                  href="#design-deliverables"
                  onClick={(e) => handleNavClick(e, "design-deliverables")}
                  className={`text-center text-[15px] font-bold tabular-nums transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer ${
                    activeSection === "design-deliverables"
                      ? "text-primary scale-110"
                      : "text-muted-foreground/60 hover:text-foreground active:text-primary"
                  }`}
                >
                  06
                </a>
                <a
                  href="#analysis-impact"
                  onClick={(e) => handleNavClick(e, "analysis-impact")}
                  className={`text-center text-[15px] font-bold tabular-nums transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer ${
                    activeSection === "analysis-impact"
                      ? "text-primary scale-110"
                      : "text-muted-foreground/60 hover:text-foreground active:text-primary"
                  }`}
                >
                  07
                </a>
                <a
                  href="#future-scope"
                  onClick={(e) => handleNavClick(e, "future-scope")}
                  className={`text-center text-[15px] font-bold tabular-nums transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer ${
                    activeSection === "future-scope"
                      ? "text-primary scale-110"
                      : "text-muted-foreground/60 hover:text-foreground active:text-primary"
                  }`}
                >
                  08
                </a>
                <a
                  href="#credits"
                  onClick={(e) => handleNavClick(e, "credits")}
                  className={`text-center text-[15px] font-bold tabular-nums transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer ${
                    activeSection === "credits"
                      ? "text-primary scale-110"
                      : "text-muted-foreground/60 hover:text-foreground active:text-primary"
                  }`}
                >
                  09
                </a>
              </div>
              {/* Active Section Title */}
              <div className="mt-2.5 min-h-[24px]">
                <motion.p 
                  key={activeSection}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[13px] font-medium text-foreground/90 tracking-[-0.01em]"
                >
                  {activeSection === "cover" && "Cover"}
                  {activeSection === "context" && "Context"}
                  {activeSection === "product-vision" && "Product Vision"}
                  {activeSection === "user-research" && "User Research"}
                  {activeSection === "design-direction" && "Design Direction"}
                  {activeSection === "methods-processes" && "Methods & Processes"}
                  {activeSection === "design-deliverables" && "Design Deliverables"}
                  {activeSection === "analysis-impact" && "Analysis & Impact"}
                  {activeSection === "future-scope" && "Future Scope"}
                  {activeSection === "credits" && "Credits"}
                </motion.p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8 lg:gap-2 md:px-12 lg:px-20">
            {/* Index Column - Sticky on left (Desktop only) */}
            <aside className="hidden lg:block col-span-2 lg:col-start-1">
              <div className="sticky top-32">
                <h4 className="text-[15px] uppercase tracking-[0.12em] font-bold text-muted-foreground/50 mb-10">
                  Contents
                </h4>
                <nav className="space-y-1 border-l-[1.5px] border-border/20">
                  <a 
                    href="#cover" 
                    onClick={(e) => handleNavClick(e, "cover")}
                    className={`group flex items-baseline gap-3.5 py-3.5 pl-5 text-[14.5px] transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[-0.012em] border-l-[2.5px] -ml-[1.5px] cursor-pointer ${
                      activeSection === "cover" 
                        ? "border-primary text-foreground font-medium" 
                        : "border-transparent text-muted-foreground/65 hover:text-foreground/95 hover:border-primary/50 hover:pl-6 hover:font-medium"
                    }`}
                  >
                    <span className={`text-[14.5px] font-bold transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[0.03em] tabular-nums ${
                      activeSection === "cover" 
                        ? "text-primary scale-110 translate-x-0.5" 
                        : "text-muted-foreground/45 group-hover:text-primary/90 group-hover:scale-110"
                    }`}>00</span>
                    <span className="leading-[1.35] transition-all duration-250">Cover</span>
                  </a>
                  <a 
                    href="#context" 
                    onClick={(e) => handleNavClick(e, "context")}
                    className={`group flex items-baseline gap-3.5 py-3.5 pl-5 text-[14.5px] transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[-0.012em] border-l-[2.5px] -ml-[1.5px] cursor-pointer ${
                      activeSection === "context" 
                        ? "border-primary text-foreground font-medium" 
                        : "border-transparent text-muted-foreground/65 hover:text-foreground/95 hover:border-primary/50 hover:pl-6 hover:font-medium"
                    }`}
                  >
                    <span className={`text-[14.5px] font-bold transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[0.03em] tabular-nums ${
                      activeSection === "context" 
                        ? "text-primary scale-110 translate-x-0.5" 
                        : "text-muted-foreground/45 group-hover:text-primary/90 group-hover:scale-110"
                    }`}>01</span>
                    <span className="leading-[1.35] transition-all duration-250">Context</span>
                  </a>
                  <a 
                    href="#product-vision" 
                    onClick={(e) => handleNavClick(e, "product-vision")}
                    className={`group flex items-baseline gap-3.5 py-3.5 pl-5 text-[14.5px] transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[-0.012em] border-l-[2.5px] -ml-[1.5px] cursor-pointer ${
                      activeSection === "product-vision" 
                        ? "border-primary text-foreground font-medium" 
                        : "border-transparent text-muted-foreground/65 hover:text-foreground/95 hover:border-primary/50 hover:pl-6 hover:font-medium"
                    }`}
                  >
                    <span className={`text-[14.5px] font-bold transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[0.03em] tabular-nums ${
                      activeSection === "product-vision" 
                        ? "text-primary scale-110 translate-x-0.5" 
                        : "text-muted-foreground/45 group-hover:text-primary/90 group-hover:scale-110"
                    }`}>02</span>
                    <span className="leading-[1.35] transition-all duration-250">Product Vision</span>
                  </a>
                  <a 
                    href="#user-research" 
                    onClick={(e) => handleNavClick(e, "user-research")}
                    className={`group flex items-baseline gap-3.5 py-3.5 pl-5 text-[14.5px] transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[-0.012em] border-l-[2.5px] -ml-[1.5px] cursor-pointer ${
                      activeSection === "user-research" 
                        ? "border-primary text-foreground font-medium" 
                        : "border-transparent text-muted-foreground/65 hover:text-foreground/95 hover:border-primary/50 hover:pl-6 hover:font-medium"
                    }`}
                  >
                    <span className={`text-[14.5px] font-bold transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[0.03em] tabular-nums ${
                      activeSection === "user-research" 
                        ? "text-primary scale-110 translate-x-0.5" 
                        : "text-muted-foreground/45 group-hover:text-primary/90 group-hover:scale-110"
                    }`}>03</span>
                    <span className="leading-[1.35] transition-all duration-250">User Research</span>
                  </a>
                  <a 
                    href="#design-direction" 
                    onClick={(e) => handleNavClick(e, "design-direction")}
                    className={`group flex items-baseline gap-3.5 py-3.5 pl-5 text-[14.5px] transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[-0.012em] border-l-[2.5px] -ml-[1.5px] cursor-pointer ${
                      activeSection === "design-direction" 
                        ? "border-primary text-foreground font-medium" 
                        : "border-transparent text-muted-foreground/65 hover:text-foreground/95 hover:border-primary/50 hover:pl-6 hover:font-medium"
                    }`}
                  >
                    <span className={`text-[14.5px] font-bold transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[0.03em] tabular-nums ${
                      activeSection === "design-direction" 
                        ? "text-primary scale-110 translate-x-0.5" 
                        : "text-muted-foreground/45 group-hover:text-primary/90 group-hover:scale-110"
                    }`}>04</span>
                    <span className="leading-[1.35] transition-all duration-250">Design Direction</span>
                  </a>
                  <a 
                    href="#methods-processes" 
                    onClick={(e) => handleNavClick(e, "methods-processes")}
                    className={`group flex items-baseline gap-3.5 py-3.5 pl-5 text-[14.5px] transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[-0.012em] border-l-[2.5px] -ml-[1.5px] cursor-pointer ${
                      activeSection === "methods-processes" 
                        ? "border-primary text-foreground font-medium" 
                        : "border-transparent text-muted-foreground/65 hover:text-foreground/95 hover:border-primary/50 hover:pl-6 hover:font-medium"
                    }`}
                  >
                    <span className={`text-[14.5px] font-bold transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[0.03em] tabular-nums ${
                      activeSection === "methods-processes" 
                        ? "text-primary scale-110 translate-x-0.5" 
                        : "text-muted-foreground/45 group-hover:text-primary/90 group-hover:scale-110"
                    }`}>05</span>
                    <span className="leading-[1.35] transition-all duration-250">Methods & Processes</span>
                  </a>
                  <a 
                    href="#design-deliverables" 
                    onClick={(e) => handleNavClick(e, "design-deliverables")}
                    className={`group flex items-baseline gap-3.5 py-3.5 pl-5 text-[14.5px] transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[-0.012em] border-l-[2.5px] -ml-[1.5px] cursor-pointer ${
                      activeSection === "design-deliverables" 
                        ? "border-primary text-foreground font-medium" 
                        : "border-transparent text-muted-foreground/65 hover:text-foreground/95 hover:border-primary/50 hover:pl-6 hover:font-medium"
                    }`}
                  >
                    <span className={`text-[14.5px] font-bold transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[0.03em] tabular-nums ${
                      activeSection === "design-deliverables" 
                        ? "text-primary scale-110 translate-x-0.5" 
                        : "text-muted-foreground/45 group-hover:text-primary/90 group-hover:scale-110"
                    }`}>06</span>
                    <span className="leading-[1.35] transition-all duration-250">Design Deliverables</span>
                  </a>
                  <a 
                    href="#analysis-impact" 
                    onClick={(e) => handleNavClick(e, "analysis-impact")}
                    className={`group flex items-baseline gap-3.5 py-3.5 pl-5 text-[14.5px] transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[-0.012em] border-l-[2.5px] -ml-[1.5px] cursor-pointer ${
                      activeSection === "analysis-impact" 
                        ? "border-primary text-foreground font-medium" 
                        : "border-transparent text-muted-foreground/65 hover:text-foreground/95 hover:border-primary/50 hover:pl-6 hover:font-medium"
                    }`}
                  >
                    <span className={`text-[14.5px] font-bold transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[0.03em] tabular-nums ${
                      activeSection === "analysis-impact" 
                        ? "text-primary scale-110 translate-x-0.5" 
                        : "text-muted-foreground/45 group-hover:text-primary/90 group-hover:scale-110"
                    }`}>07</span>
                    <span className="leading-[1.35] transition-all duration-250">Analysis & Impact</span>
                  </a>
                  <a 
                    href="#future-scope" 
                    onClick={(e) => handleNavClick(e, "future-scope")}
                    className={`group flex items-baseline gap-3.5 py-3.5 pl-5 text-[14.5px] transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[-0.012em] border-l-[2.5px] -ml-[1.5px] cursor-pointer ${
                      activeSection === "future-scope" 
                        ? "border-primary text-foreground font-medium" 
                        : "border-transparent text-muted-foreground/65 hover:text-foreground/95 hover:border-primary/50 hover:pl-6 hover:font-medium"
                    }`}
                  >
                    <span className={`text-[14.5px] font-bold transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[0.03em] tabular-nums ${
                      activeSection === "future-scope" 
                        ? "text-primary scale-110 translate-x-0.5" 
                        : "text-muted-foreground/45 group-hover:text-primary/90 group-hover:scale-110"
                    }`}>08</span>
                    <span className="leading-[1.35] transition-all duration-250">Future Scope</span>
                  </a>
                  <a 
                    href="#credits" 
                    onClick={(e) => handleNavClick(e, "credits")}
                    className={`group flex items-baseline gap-3.5 py-3.5 pl-5 text-[14.5px] transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[-0.012em] border-l-[2.5px] -ml-[1.5px] cursor-pointer ${
                      activeSection === "credits" 
                        ? "border-primary text-foreground font-medium" 
                        : "border-transparent text-muted-foreground/65 hover:text-foreground/95 hover:border-primary/50 hover:pl-6 hover:font-medium"
                    }`}
                  >
                    <span className={`text-[14.5px] font-bold transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)] tracking-[0.03em] tabular-nums ${
                      activeSection === "credits" 
                        ? "text-primary scale-110 translate-x-0.5" 
                        : "text-muted-foreground/45 group-hover:text-primary/90 group-hover:scale-110"
                    }`}>09</span>
                    <span className="leading-[1.35] transition-all duration-250">Credits</span>
                  </a>
                </nav>
              </div>
            </aside>

            {/* Main Content Column */}
            <div className="col-span-12 lg:col-span-9 lg:col-start-4 px-6 md:px-0">
              
              {/* Context Section */}
              <motion.section 
                id="context"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mb-32 scroll-mt-52 lg:scroll-mt-32"
              >
                <div className="mb-10">
                  <h2 className="text-[14.5px] font-bold tracking-[-0.016em] tabular-nums text-muted-foreground/65 mb-3">
                    01
                  </h2>
                  <h3 
                    onClick={() => setActiveSection("context")}
                    className="text-[36px] md:text-[44px] font-medium tracking-[-0.028em] leading-[1.12] cursor-pointer hover:text-primary transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[color]" 
                    style={{ fontFeatureSettings: "'ss01' on, 'liga' on" }}
                  >
                    Context
                  </h3>
                </div>
                <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased mb-12">
                  {project.context}
                </p>

                {/* Carousel for Story Images */}
                <>
                  {/* Carousel for Story Images */}
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-120px" }}
                      transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="mt-16 -mx-6 md:mx-0"
                    >
                      <div className="relative group carousel-container">
                        <style>{`
                          .carousel-container .slick-slider {
                            position: relative;
                          }
                          .carousel-container .slick-list {
                            overflow: hidden;
                            border-radius: 0;
                            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 10px 40px -10px rgba(0, 0, 0, 0.15);
                            border: none;
                            background: transparent;
                          }
                          @media (min-width: 768px) {
                            .carousel-container .slick-list {
                              border-radius: 16px;
                              border: 1px solid rgba(0, 0, 0, 0.06);
                            }
                          }
                          .carousel-container .slick-track {
                            display: flex;
                            align-items: stretch;
                          }
                          .carousel-container .slick-slide {
                            height: auto;
                            display: flex;
                          }
                          .carousel-container .slick-slide > div {
                            height: 100%;
                            width: 100%;
                            display: flex;
                          }
                          .carousel-container .slick-slide > div > div {
                            height: 100%;
                            width: 100%;
                            display: flex;
                          }
                          .carousel-container .slick-slide img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                          }
                          .carousel-container .slick-dots {
                            bottom: 20px;
                            z-index: 20;
                            display: flex !important;
                            justify-content: center;
                            align-items: center;
                            gap: 6px;
                            padding: 0;
                            margin: 0;
                            width: fit-content;
                            left: 50%;
                            transform: translateX(-50%);
                          }
                          .carousel-container .slick-dots li {
                            width: 8px;
                            height: 8px;
                            margin: 0;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                          }
                          .carousel-container .slick-dots li button {
                            width: 8px;
                            height: 8px;
                            padding: 0;
                            font-size: 0;
                            line-height: 0;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            cursor: pointer;
                            color: transparent;
                            border: 0;
                            outline: none;
                            background: transparent;
                            position: relative;
                          }
                          .carousel-container .slick-dots li button:before {
                            font-family: 'slick';
                            font-size: 0;
                            line-height: 0;
                            position: relative;
                            top: auto;
                            left: auto;
                            content: '•';
                            width: 8px;
                            height: 8px;
                            border-radius: 50%;
                            background: rgba(255, 255, 255, 0.4);
                            opacity: 1;
                            transition: all 0.25s cubic-bezier(0.33, 1, 0.68, 1);
                            display: block;
                          }
                          .carousel-container .slick-dots li.slick-active button:before {
                            background: rgba(255, 255, 255, 1);
                            width: 8px;
                            height: 8px;
                            border-radius: 50%;
                            box-shadow: 0 2px 8px rgba(255, 255, 255, 0.3);
                          }
                          .carousel-container .slick-dots li:hover button:before {
                            background: rgba(255, 255, 255, 0.65);
                          }
                        `}</style>
                        
                        {/* Fixed Maximize Button */}
                        <motion.button
                          onClick={() => {
                            setFullscreenImage(carouselImages[currentSlide]);
                            setFullscreenImageIndex(currentSlide);
                            setIsCarouselFullscreen(true);
                            setIsFullscreen(true);
                          }}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute top-2 md:top-3 right-2 md:right-3 z-40 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100"
                          aria-label="View fullscreen"
                        >
                          <motion.div
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ArrowsOut 
                              size={18} 
                              weight="bold"
                              className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" 
                            />
                          </motion.div>
                        </motion.button>
                        
                        <Slider
                          dots={true}
                          infinite={true}
                          speed={600}
                          slidesToShow={1}
                          slidesToScroll={1}
                          autoplay={false}
                          arrows={true}
                          prevArrow={<CustomPrevArrow />}
                          nextArrow={<CustomNextArrow />}
                          cssEase="cubic-bezier(0.4, 0, 0.2, 1)"
                          lazyLoad="progressive"
                          beforeChange={(oldIndex: number, newIndex: number) => setCurrentSlide(newIndex)}
                        >
                          {carouselImages.map((image, index) => (
                            <div key={index}>
                              <div className="relative w-full h-full">
                                <img 
                                  src={image} 
                                  alt={`Story image ${index + 1}`}
                                  className="w-full h-full block select-none"
                                  draggable="false"
                                />
                              </div>
                            </div>
                          ))}
                        </Slider>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-120px" }}
                      transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="mt-16 space-y-8"
                    >
                      <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased">
                        Our design approach emphasized creating a cohesive user experience that seamlessly integrated complex workflows into intuitive interfaces. Through extensive user research and iterative prototyping, we developed interaction patterns that reduced cognitive load while maintaining the depth of functionality required by power users.
                      </p>

                      <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased">
                        The visual language we established balanced professional aesthetics with accessibility considerations, ensuring that the interface remained approachable for diverse user groups. Strategic use of white space, typography, and subtle animations created a sense of clarity and refinement throughout the product experience.
                      </p>

                      <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased">
                        Cross-functional collaboration played a crucial role in translating stakeholder requirements into design solutions that addressed real user needs. Regular design reviews and usability testing sessions ensured alignment between business objectives, technical constraints, and user expectations throughout the development process.
                      </p>
                    </motion.div>

                    {/* Second Story Image */}
                    <motion.figure
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-120px" }}
                      transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="mt-16 group -mx-6 md:mx-0"
                    >
                      <div className="relative overflow-hidden">
                        {/* Maximize Button - Same as Carousel */}
                        <motion.button
                          onClick={() => {
                            setFullscreenImage(longImage);
                            setIsCarouselFullscreen(false);
                            setIsFullscreen(true);
                          }}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute top-2 md:top-3 right-2 md:right-3 z-40 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-shadow duration-300 opacity-0 group-hover:opacity-100"
                          aria-label="View fullscreen"
                        >
                          <motion.div
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ArrowsOut 
                              size={18} 
                              weight="bold"
                              className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" 
                            />
                          </motion.div>
                        </motion.button>

                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                          className="md:rounded-2xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_40px_-10px_rgba(0,0,0,0.15)] md:border md:border-black/[0.06]"
                        >
                          <img 
                            src={longImage} 
                            alt="Story section visual"
                            className="w-full h-auto block select-none"
                            draggable="false"
                          />
                        </motion.div>
                      </div>
                    </motion.figure>
                  </>
              </motion.section>

              {/* Research Section */}
              <motion.section 
                id="product-vision"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mb-32 scroll-mt-52 lg:scroll-mt-32"
              >
                <div className="mb-10">
                  <h2 className="text-[14.5px] font-bold tracking-[-0.016em] tabular-nums text-muted-foreground/65 mb-3">
                    02
                  </h2>
                  <h3 
                    onClick={() => setActiveSection("product-vision")}
                    className="text-[36px] md:text-[44px] font-medium tracking-[-0.028em] leading-[1.12] cursor-pointer hover:text-primary transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[color]" 
                    style={{ fontFeatureSettings: "'ss01' on, 'liga' on" }}
                  >
                    Product Vision
                  </h3>
                </div>
                <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased mb-12">
                  {project.research}
                </p>

                <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased mb-12">
                  Our vision centered on creating a cohesive ecosystem that would empower users to make informed decisions. Through extensive stakeholder interviews and user research, we identified key pain points and opportunities for innovation. The product strategy focused on scalability, accessibility, and seamless integration with existing workflows.
                </p>

                <motion.figure
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-12 group"
                >
                  <div className="relative overflow-hidden">
                    <motion.button
                      onClick={() => {
                        setFullscreenImage(contentImage1);
                        setIsCarouselFullscreen(false);
                        setIsFullscreen(true);
                      }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-2 md:top-3 right-2 md:right-3 z-40 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-shadow duration-300 opacity-0 group-hover:opacity-100"
                      aria-label="View fullscreen"
                    >
                      <motion.div
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowsOut 
                          size={18} 
                          weight="bold"
                          className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" 
                        />
                      </motion.div>
                    </motion.button>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-xl overflow-hidden shadow-lg"
                    >
                      <img src={contentImage1} alt="Product Vision" className="w-full h-auto" />
                    </motion.div>
                  </div>
                  <figcaption className="mt-6 px-6 md:px-0 text-[15px] text-muted-foreground leading-[1.47] max-w-4xl font-light">
                    Early strategic alignment sessions defining core product principles and user value propositions
                  </figcaption>
                </motion.figure>

                <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased mb-12">
                  We established clear principles that would guide all design decisions: prioritize user needs, maintain consistency across touchpoints, and ensure every interaction adds value. The roadmap was structured around iterative releases, allowing us to validate assumptions and incorporate feedback continuously.
                </p>

                <motion.figure
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-12 group"
                >
                  <div className="relative overflow-hidden">
                    <motion.button
                      onClick={() => {
                        setFullscreenImage(contentImage2);
                        setIsCarouselFullscreen(false);
                        setIsFullscreen(true);
                      }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-2 md:top-3 right-2 md:right-3 z-40 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-shadow duration-300 opacity-0 group-hover:opacity-100"
                      aria-label="View fullscreen"
                    >
                      <motion.div
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowsOut 
                          size={18} 
                          weight="bold"
                          className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" 
                        />
                      </motion.div>
                    </motion.button>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-xl overflow-hidden shadow-lg"
                    >
                      <img src={contentImage2} alt="Product Strategy" className="w-full h-auto" />
                    </motion.div>
                  </div>
                  <figcaption className="mt-6 px-6 md:px-0 text-[15px] text-muted-foreground leading-[1.47] max-w-4xl font-light">
                    Product roadmap visualization showing phased rollout and key milestone dependencies
                  </figcaption>
                </motion.figure>

                <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased">
                  By aligning cross-functional teams around shared objectives and success metrics, we created a foundation for sustainable growth. The vision emphasized long-term impact over short-term gains, ensuring that every feature contributed to the broader product narrative and user value proposition.
                </p>
              </motion.section>

              {/* User Research Section */}
              <motion.section 
                id="user-research"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mb-32 scroll-mt-52 lg:scroll-mt-32"
              >
                <div className="mb-10">
                  <h2 className="text-[14.5px] font-bold tracking-[-0.016em] tabular-nums text-muted-foreground/65 mb-3">
                    03
                  </h2>
                  <h3 
                    onClick={() => setActiveSection("user-research")}
                    className="text-[36px] md:text-[44px] font-medium tracking-[-0.028em] leading-[1.12] cursor-pointer hover:text-primary transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[color]" 
                    style={{ fontFeatureSettings: "'ss01' on, 'liga' on" }}
                  >
                    User Research
                  </h3>
                </div>
                <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased mb-12">
                  {project.research}
                </p>

                <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased mb-12">
                  Our research methodology combined qualitative and quantitative approaches, ensuring comprehensive insights into user needs and behaviors. Through extensive stakeholder interviews and usability testing, we identified key pain points and opportunities for innovation.
                </p>
              </motion.section>

              {/* Design Direction Section */}
              <motion.section 
                id="design-direction"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mb-32 scroll-mt-52 lg:scroll-mt-32"
              >
                <div className="mb-10">
                  <h2 className="text-[14.5px] font-bold tracking-[-0.016em] tabular-nums text-muted-foreground/65 mb-3">
                    04
                  </h2>
                  <h3 
                    onClick={() => setActiveSection("design-direction")}
                    className="text-[36px] md:text-[44px] font-medium tracking-[-0.028em] leading-[1.12] cursor-pointer hover:text-primary transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[color]" 
                    style={{ fontFeatureSettings: "'ss01' on, 'liga' on" }}
                  >
                    Design Direction
                  </h3>
                </div>
                <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased mb-12">
                  {project.designSystem}
                </p>

                <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased mb-12">
                  The design direction was rooted in clarity and purpose. We explored various visual languages, testing different approaches with users to understand which resonated most effectively. Every element was intentionally crafted to support the user's journey while maintaining brand consistency.
                </p>

                <motion.figure
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-12 group"
                >
                  <div className="relative overflow-hidden">
                    <motion.button
                      onClick={() => {
                        setFullscreenImage(contentImage1);
                        setIsCarouselFullscreen(false);
                        setIsFullscreen(true);
                      }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-2 md:top-3 right-2 md:right-3 z-40 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-shadow duration-300 opacity-0 group-hover:opacity-100"
                      aria-label="View fullscreen"
                    >
                      <motion.div
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowsOut 
                          size={18} 
                          weight="bold"
                          className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" 
                        />
                      </motion.div>
                    </motion.button>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-xl overflow-hidden shadow-lg"
                    >
                      <img src={contentImage1} alt="Design Direction" className="w-full h-auto" />
                    </motion.div>
                  </div>
                  <figcaption className="mt-6 px-6 md:px-0 text-[15px] text-muted-foreground leading-[1.47] max-w-4xl font-light">
                    Visual exploration showcasing typography hierarchy, color palette, and spacing principles
                  </figcaption>
                </motion.figure>

                <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased mb-12">
                  Typography, color, and spatial relationships were carefully considered to create a harmonious system. We established a comprehensive design language that could scale across platforms while maintaining coherence. Accessibility was built into the foundation, ensuring inclusive experiences for all users.
                </p>

                <motion.figure
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-12 group"
                >
                  <div className="relative overflow-hidden">
                    <motion.button
                      onClick={() => {
                        setFullscreenImage(contentImage2);
                        setIsCarouselFullscreen(false);
                        setIsFullscreen(true);
                      }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-2 md:top-3 right-2 md:right-3 z-40 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-shadow duration-300 opacity-0 group-hover:opacity-100"
                      aria-label="View fullscreen"
                    >
                      <motion.div
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowsOut 
                          size={18} 
                          weight="bold"
                          className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" 
                        />
                      </motion.div>
                    </motion.button>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-xl overflow-hidden shadow-lg"
                    >
                      <img src={contentImage2} alt="Design System" className="w-full h-auto" />
                    </motion.div>
                  </div>
                  <figcaption className="mt-6 px-6 md:px-0 text-[15px] text-muted-foreground leading-[1.47] max-w-4xl font-light">
                    Component library documentation demonstrating reusable patterns and design tokens
                  </figcaption>
                </motion.figure>

                <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased">
                  Through iterative refinement and close collaboration with development teams, we ensured the design direction was both aspirational and achievable. The result was a flexible framework that empowered teams to create consistent, high-quality experiences efficiently.
                </p>
              </motion.section>

              {/* Images Section */}
              {project.images.length > 0 && (
                <section className="mb-32 mt-20">
                  <div className="space-y-24">
                    {project.images.map((image, index) => (
                      <motion.figure 
                        key={index}
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-150px" }}
                        transition={{ 
                          duration: 0.9, 
                          delay: index * 0.15,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                        className="group -mx-6 md:mx-0"
                      >
                        <div className="relative overflow-hidden bg-muted/30">
                          <motion.div
                            whileHover={{ scale: 1.01 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="md:rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_40px_-10px_rgba(0,0,0,0.15)]"
                          >
                            <ImageWithFallback
                              src={image.url}
                              alt={image.caption}
                              className="w-full h-auto"
                            />
                          </motion.div>
                        </div>
                        <figcaption className="mt-6 px-6 md:px-0 text-[15px] text-muted-foreground leading-[1.47] max-w-4xl font-light">
                          {image.caption}
                        </figcaption>
                      </motion.figure>
                    ))}
                  </div>
                </section>
              )}

              {/* Methods & Processes Section */}
              <motion.section 
                id="methods-processes"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mb-32 scroll-mt-52 lg:scroll-mt-32"
              >
                <div className="mb-10">
                  <h2 className="text-[14.5px] font-bold tracking-[-0.016em] tabular-nums text-muted-foreground/65 mb-3">
                    05
                  </h2>
                  <h3 
                    onClick={() => setActiveSection("methods-processes")}
                    className="text-[36px] md:text-[44px] font-medium tracking-[-0.028em] leading-[1.12] cursor-pointer hover:text-primary transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[color]" 
                    style={{ fontFeatureSettings: "'ss01' on, 'liga' on" }}
                  >
                    Methods & Processes
                  </h3>
                </div>
                <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased mb-12">
                  {project.prototyping}
                </p>

                <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased mb-12">
                  Our methodology combined lean UX principles with design thinking frameworks. We facilitated collaborative workshops that brought together diverse perspectives, ensuring alignment across stakeholders. Rapid prototyping enabled us to test concepts early and often, reducing risk and accelerating learning.
                </p>

                <motion.figure
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-12 group"
                >
                  <div className="relative overflow-hidden">
                    <motion.button
                      onClick={() => {
                        setFullscreenImage(contentImage1);
                        setIsCarouselFullscreen(false);
                        setIsFullscreen(true);
                      }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-2 md:top-3 right-2 md:right-3 z-40 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-shadow duration-300 opacity-0 group-hover:opacity-100"
                      aria-label="View fullscreen"
                    >
                      <motion.div
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowsOut 
                          size={18} 
                          weight="bold"
                          className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" 
                        />
                      </motion.div>
                    </motion.button>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-xl overflow-hidden shadow-lg"
                    >
                      <img src={contentImage1} alt="Process Methods" className="w-full h-auto" />
                    </motion.div>
                  </div>
                  <figcaption className="mt-6 px-6 md:px-0 text-[15px] text-muted-foreground leading-[1.47] max-w-4xl font-light">
                    Workshop facilitation and collaborative ideation sessions with cross-functional team members
                  </figcaption>
                </motion.figure>

                <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased mb-12">
                  User research formed the backbone of our process. Through interviews, usability testing, and analytics analysis, we gathered actionable insights that informed every decision. Cross-functional rituals ensured transparent communication and continuous alignment throughout the product lifecycle.
                </p>

                <motion.figure
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-12 group"
                >
                  <div className="relative overflow-hidden">
                    <motion.button
                      onClick={() => {
                        setFullscreenImage(contentImage2);
                        setIsCarouselFullscreen(false);
                        setIsFullscreen(true);
                      }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-2 md:top-3 right-2 md:right-3 z-40 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-shadow duration-300 opacity-0 group-hover:opacity-100"
                      aria-label="View fullscreen"
                    >
                      <motion.div
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowsOut 
                          size={18} 
                          weight="bold"
                          className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" 
                        />
                      </motion.div>
                    </motion.button>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-xl overflow-hidden shadow-lg"
                    >
                      <img src={contentImage2} alt="Methodology" className="w-full h-auto" />
                    </motion.div>
                  </div>
                  <figcaption className="mt-6 px-6 md:px-0 text-[15px] text-muted-foreground leading-[1.47] max-w-4xl font-light">
                    User research synthesis mapping insights to opportunities and prioritized feature development
                  </figcaption>
                </motion.figure>

                <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased">
                  By establishing clear rituals and documentation practices, we created a sustainable workflow that supported both speed and quality. The process remained flexible enough to adapt to emerging needs while maintaining the rigor necessary for delivering exceptional experiences.
                </p>
              </motion.section>

              {/* Design Deliverables Section */}
              <motion.section 
                id="design-deliverables"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mb-32 scroll-mt-52 lg:scroll-mt-32"
              >
                <div className="mb-10">
                  <h2 className="text-[14.5px] font-bold tracking-[-0.016em] tabular-nums text-muted-foreground/65 mb-3">
                    06
                  </h2>
                  <h3 
                    onClick={() => setActiveSection("design-deliverables")}
                    className="text-[36px] md:text-[44px] font-medium tracking-[-0.028em] leading-[1.12] cursor-pointer hover:text-primary transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[color]" 
                    style={{ fontFeatureSettings: "'ss01' on, 'liga' on" }}
                  >
                    Design Deliverables
                  </h3>
                </div>
                <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased mb-12">
                  {project.outcome}
                </p>

                <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased mb-12">
                  Comprehensive documentation served as the single source of truth for the entire team. We created living style guides, pattern libraries, and detailed component specifications that evolved alongside the product. Clear documentation accelerated onboarding and ensured consistency across all touchpoints. Beyond static documentation, we established interactive prototypes and code examples that demonstrated best practices.
                </p>

                <motion.figure
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-12 group"
                >
                  <div className="relative overflow-hidden">
                    <motion.button
                      onClick={() => {
                        setFullscreenImage(contentImage2);
                        setIsCarouselFullscreen(false);
                        setIsFullscreen(true);
                      }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-2 md:top-3 right-2 md:right-3 z-40 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-shadow duration-300 opacity-0 group-hover:opacity-100"
                      aria-label="View fullscreen"
                    >
                      <motion.div
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowsOut 
                          size={18} 
                          weight="bold"
                          className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" 
                        />
                      </motion.div>
                    </motion.button>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-xl overflow-hidden shadow-lg"
                    >
                      <img src={contentImage2} alt="Design System Documentation" className="w-full h-auto" />
                    </motion.div>
                  </div>
                  <figcaption className="mt-6 px-6 md:px-0 text-[15px] text-muted-foreground leading-[1.47] max-w-4xl font-light">
                    Living style guide with interactive examples and implementation guidelines for developers
                  </figcaption>
                </motion.figure>

                <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased">
                  Regular documentation reviews and updates kept the system relevant as the product matured. We fostered a culture of contribution where team members could propose improvements, ensuring the documentation remained valuable and reflective of current practices.
                </p>
              </motion.section>

              {/* Analysis & Impact Section */}
              <motion.section 
                id="analysis-impact"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mb-32 scroll-mt-52 lg:scroll-mt-32"
              >
                <div className="mb-10">
                  <h2 className="text-[14.5px] font-bold tracking-[-0.016em] tabular-nums text-muted-foreground/65 mb-3">
                    07
                  </h2>
                  <h3 
                    onClick={() => setActiveSection("analysis-impact")}
                    className="text-[36px] md:text-[44px] font-medium tracking-[-0.028em] leading-[1.12] cursor-pointer hover:text-primary transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[color]" 
                    style={{ fontFeatureSettings: "'ss01' on, 'liga' on" }}
                  >
                    Analysis & Impact
                  </h3>
                </div>
                <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased mb-12">
                  {project.outcome}
                </p>

                <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased mb-12">
                  Measuring impact required establishing clear success metrics from the outset. We tracked both quantitative indicators like task completion rates and qualitative feedback from user interviews. The data revealed significant improvements in user satisfaction and operational efficiency across key workflows. Beyond immediate metrics, we observed broader organizational impacts and lasting cultural change.
                </p>

                <motion.figure
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-12 group"
                >
                  <div className="relative overflow-hidden">
                    <motion.button
                      onClick={() => {
                        setFullscreenImage(contentImage2);
                        setIsCarouselFullscreen(false);
                        setIsFullscreen(true);
                      }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-2 md:top-3 right-2 md:right-3 z-40 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-shadow duration-300 opacity-0 group-hover:opacity-100"
                      aria-label="View fullscreen"
                    >
                      <motion.div
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowsOut 
                          size={18} 
                          weight="bold"
                          className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" 
                        />
                      </motion.div>
                    </motion.button>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-xl overflow-hidden shadow-lg"
                    >
                      <img src={contentImage2} alt="Impact Metrics" className="w-full h-auto" />
                    </motion.div>
                  </div>
                  <figcaption className="mt-6 px-6 md:px-0 text-[15px] text-muted-foreground leading-[1.47] max-w-4xl font-light">
                    Quantitative dashboard showing KPI trends and user satisfaction metrics post-launch
                  </figcaption>
                </motion.figure>

                <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased">
                  Long-term analysis showed sustained improvements in user engagement and business outcomes. The foundation we built enabled rapid iteration on new features while maintaining quality standards. This project demonstrated how thoughtful design creates compounding value over time.
                </p>
              </motion.section>

              {/* Outcome Section - Highlighted */}
              <motion.section 
                id="future-scope"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mb-32 scroll-mt-52 lg:scroll-mt-32"
              >
                <div className="mb-10">
                  <h2 className="text-[14.5px] font-bold tracking-[-0.016em] tabular-nums text-muted-foreground/65 mb-3">
                    08
                  </h2>
                  <h3 
                    onClick={() => setActiveSection("future-scope")}
                    className="text-[36px] md:text-[44px] font-medium tracking-[-0.028em] leading-[1.12] cursor-pointer hover:text-primary transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[color]" 
                    style={{ fontFeatureSettings: "'ss01' on, 'liga' on" }}
                  >
                    Future Scope
                  </h3>
                </div>
                <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased mb-12">
                  {project.outcome}
                </p>

                <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased mb-12">
                  Looking ahead, we identified several opportunities to extend and enhance the experience. Emerging technologies present possibilities for more personalized, intelligent interactions. We mapped a roadmap that balances innovation with stability, ensuring we build on the strong foundation already established.
                </p>

                <motion.figure
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-12 group"
                >
                  <div className="relative overflow-hidden">
                    <motion.button
                      onClick={() => {
                        setFullscreenImage(contentImage1);
                        setIsCarouselFullscreen(false);
                        setIsFullscreen(true);
                      }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-2 md:top-3 right-2 md:right-3 z-40 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-shadow duration-300 opacity-0 group-hover:opacity-100"
                      aria-label="View fullscreen"
                    >
                      <motion.div
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowsOut 
                          size={18} 
                          weight="bold"
                          className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" 
                        />
                      </motion.div>
                    </motion.button>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-xl overflow-hidden shadow-lg"
                    >
                      <img src={contentImage1} alt="Future Scope" className="w-full h-auto" />
                    </motion.div>
                  </div>
                  <figcaption className="mt-6 px-6 md:px-0 text-[15px] text-muted-foreground leading-[1.47] max-w-4xl font-light">
                    Future roadmap outlining planned features and strategic expansion opportunities
                  </figcaption>
                </motion.figure>

                <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased">
                  Expanding into new platforms and channels will require thoughtful adaptation of our design system. We're exploring how to maintain consistency while respecting the unique constraints and opportunities of each context. User research continues to inform our prioritization and strategic direction. The next phase focuses on deepening engagement and expanding reach, using data and feedback to evolve the experience while remaining open to unexpected opportunities.
                </p>
              </motion.section>

              {/* Outcome Section - Highlighted */}
              <motion.section 
                id="credits"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mb-32 scroll-mt-52 lg:scroll-mt-32"
              >
                <div className="mb-10">
                  <h2 className="text-[14.5px] font-bold tracking-[-0.016em] tabular-nums text-muted-foreground/65 mb-3">
                    09
                  </h2>
                  <h3 
                    onClick={() => setActiveSection("credits")}
                    className="text-[36px] md:text-[44px] font-medium tracking-[-0.028em] leading-[1.12] cursor-pointer hover:text-primary transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[color]" 
                    style={{ fontFeatureSettings: "'ss01' on, 'liga' on" }}
                  >
                    Credits
                  </h3>
                </div>
                <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased mb-12">
                  {project.outcome}
                </p>

                <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased mb-12">
                  This project represents the collective effort of a talented, multidisciplinary team. From researchers and designers to engineers and product managers, each person brought unique expertise and perspective. The collaborative spirit and mutual respect among team members were instrumental to our success.
                </p>

                <motion.figure
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-12 group"
                >
                  <div className="relative overflow-hidden">
                    <motion.button
                      onClick={() => {
                        setFullscreenImage(contentImage1);
                        setIsCarouselFullscreen(false);
                        setIsFullscreen(true);
                      }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-2 md:top-3 right-2 md:right-3 z-40 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-shadow duration-300 opacity-0 group-hover:opacity-100"
                      aria-label="View fullscreen"
                    >
                      <motion.div
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowsOut 
                          size={18} 
                          weight="bold"
                          className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" 
                        />
                      </motion.div>
                    </motion.button>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-xl overflow-hidden shadow-lg"
                    >
                      <img src={contentImage1} alt="Team Credits" className="w-full h-auto" />
                    </motion.div>
                  </div>
                  <figcaption className="mt-6 px-6 md:px-0 text-[15px] text-muted-foreground leading-[1.47] max-w-4xl font-light">
                    The multidisciplinary team that collaborated on this project across design, research, and engineering
                  </figcaption>
                </motion.figure>

                <p className="text-[19px] md:text-[21px] text-foreground/88 leading-[1.65] tracking-[-0.016em] max-w-[75ch] font-light antialiased">
                  Special recognition goes to our user research participants who provided invaluable insights, our stakeholders who trusted the process, and our leadership for creating an environment where innovation could flourish. Every contribution, large or small, shaped the final outcome. Great work emerges from great collaboration, and this project exemplified what's possible when diverse talents unite around a shared vision.
                </p>
              </motion.section>

              {/* Reaction Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mb-20"
              >
                <div className="flex flex-wrap items-center gap-3">
                  {/* Like and Love - Left Side */}
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="group flex items-center gap-2.5 px-5 py-3 bg-background hover:bg-muted/30 border border-border/50 hover:border-border rounded-lg transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-sm hover:shadow-md"
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <ThumbsUp 
                      size={16} 
                      className={`transition-colors duration-400 ${
                        isLiked 
                          ? 'text-primary' 
                          : 'text-muted-foreground/70 group-hover:text-foreground'
                      }`} 
                      strokeWidth={isLiked ? 0 : 2.2}
                      fill={isLiked ? '#0052FF' : 'none'}
                      style={{ transition: 'fill 400ms cubic-bezier(0.4,0,0.2,1)' }}
                    />
                    <span className="text-[14px] font-medium text-muted-foreground/80 group-hover:text-foreground tracking-[-0.006em] transition-colors duration-400">
                      Like
                    </span>
                    <span className="text-[14px] font-bold text-foreground/60 group-hover:text-foreground tabular-nums tracking-[0.01em] transition-colors duration-400 ml-0.5">
                      156
                    </span>
                  </motion.button>

                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="group flex items-center gap-2.5 px-5 py-3 bg-background hover:bg-muted/30 border border-border/50 hover:border-border rounded-lg transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-sm hover:shadow-md"
                    onClick={() => setIsLoved(!isLoved)}
                  >
                    <Heart 
                      size={16} 
                      className={`transition-colors duration-400 ${
                        isLoved 
                          ? 'text-red-500' 
                          : 'text-muted-foreground/70 group-hover:text-red-500'
                      }`} 
                      strokeWidth={isLoved ? 0 : 2.2}
                      fill={isLoved ? '#ef4444' : 'none'}
                      style={{ transition: 'fill 400ms cubic-bezier(0.4,0,0.2,1)' }}
                    />
                    <span className="text-[14px] font-medium text-muted-foreground/80 group-hover:text-foreground tracking-[-0.006em] transition-colors duration-400">
                      Love
                    </span>
                    <span className="text-[14px] font-bold text-foreground/60 group-hover:text-foreground tabular-nums tracking-[0.01em] transition-colors duration-400 ml-0.5">
                      84
                    </span>
                  </motion.button>

                  {/* Spacer to push right buttons to the end */}
                  <div className="flex-1"></div>

                  {/* View All Projects and Contact Me - Right Side */}
                  <Link to="/projects">
                    <motion.button
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="group flex items-center gap-2.5 px-5 py-3 bg-background hover:bg-primary/8 border border-primary/25 hover:border-primary/40 rounded-lg transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-sm hover:shadow-md"
                    >
                      <ArrowLeft size={16} className="text-primary/90 transition-all duration-400 group-hover:-translate-x-0.5" strokeWidth={2.2} />
                      <span className="text-[14px] font-medium text-primary/90 tracking-[-0.006em] transition-colors duration-400">
                        View all projects
                      </span>
                    </motion.button>
                  </Link>

                  <Link to="/contact">
                    <motion.button
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="group flex items-center gap-2.5 px-5 py-3 bg-foreground hover:bg-foreground/90 rounded-lg transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-sm hover:shadow-md"
                    >
                      <Mail size={16} className="text-background transition-colors duration-400" strokeWidth={2.2} />
                      <span className="text-[14px] font-medium text-background tracking-[-0.006em] transition-colors duration-400">
                        Contact me
                      </span>
                    </motion.button>
                  </Link>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0.8,
          y: showScrollTop ? 0 : 20
        }}
        transition={{ 
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1]
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={scrollToTop}
        className="fixed bottom-10 right-10 z-40 bg-foreground/95 hover:bg-foreground text-background p-4 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer backdrop-blur-sm"
        style={{ pointerEvents: showScrollTop ? 'auto' : 'none' }}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} strokeWidth={2.5} />
      </motion.button>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm"
            onClick={() => setIsFullscreen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full h-full overflow-y-auto overflow-x-hidden"
              onClick={(e) => e.stopPropagation()}
              ref={fullscreenContainerRef}
            >
              {/* Minimize Button - Prominent Design */}
              <motion.button
                onClick={() => setIsFullscreen(false)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed top-2 md:top-3 right-2 md:right-3 z-20 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-xl transition-all duration-300"
                aria-label="Exit fullscreen"
              >
                <motion.div
                  whileHover={{ scale: 0.85 }}
                  whileTap={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowsIn 
                    size={18} 
                    weight="bold"
                    className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" 
                  />
                </motion.div>
              </motion.button>

              {/* Previous Arrow - Only for carousel images */}
              {isCarouselFullscreen && (
                <motion.button
                  onClick={handlePrevImage}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center bg-black/40 hover:bg-black/50 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.5)] transition-all duration-300 backdrop-blur-2xl"
                  aria-label="Previous image"
                >
                  <CaretLeft size={20} weight="bold" className="text-white" />
                </motion.button>
              )}

              {/* Next Arrow - Only for carousel images */}
              {isCarouselFullscreen && (
                <motion.button
                  onClick={handleNextImage}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center bg-black/40 hover:bg-black/50 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.5)] transition-all duration-300 backdrop-blur-2xl"
                  aria-label="Next image"
                >
                  <CaretRight size={20} weight="bold" className="text-white" />
                </motion.button>
              )}

              {/* Zoom Controls - Bottom Right */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="fixed bottom-4 md:bottom-6 right-4 md:right-6 z-20 flex flex-col gap-2"
              >
                {/* Zoom In Button */}
                <motion.button
                  onClick={handleZoomIn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center bg-black/40 hover:bg-black/50 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.5)] transition-all duration-300 backdrop-blur-2xl"
                  aria-label="Zoom in"
                  disabled={zoomLevel >= 3}
                >
                  <Plus size={20} weight="bold" className="text-white" />
                </motion.button>

                {/* Zoom Level Indicator */}
                <div className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center bg-black/40 rounded-full backdrop-blur-2xl">
                  <span className="text-white text-xs font-medium">{Math.round(zoomLevel * 100)}%</span>
                </div>

                {/* Zoom Out Button */}
                <motion.button
                  onClick={handleZoomOut}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center bg-black/40 hover:bg-black/50 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.5)] transition-all duration-300 backdrop-blur-2xl"
                  aria-label="Zoom out"
                  disabled={zoomLevel <= 0.5}
                >
                  <Minus size={20} weight="bold" className="text-white" />
                </motion.button>
              </motion.div>

              {/* Image - Full Width, Scrollable Vertically */}
              <div className="w-full min-h-full flex items-start justify-center p-4 md:p-8">
                <img 
                  src={fullscreenImage} 
                  alt="Fullscreen view"
                  className="w-full h-auto object-contain rounded-lg shadow-2xl"
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'top center',
                    transition: 'transform 0.3s ease-out'
                  }}
                  draggable={false}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}