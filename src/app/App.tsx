import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { SoilAnalysisForm, type SoilAnalysisData } from './components/soil-analysis-form';
import { SoilInterpretation5th } from './components/soil-interpretation-5th';
import { Fertilization5th } from './components/fertilization-5th';
import { PlantAnalysisForm, type PlantAnalysisData } from './components/plant-analysis-form';
import { PlantInterpretation } from './components/plant-interpretation';
import { NutrientChart } from './components/nutrient-chart';
import { ScrollToTop } from './components/scroll-to-top';
import { 
  FileText, 
  Leaf, 
  FlaskConical, 
  Microscope, 
  Award, 
  Users, 
  Phone, 
  Mail, 
  MapPin,
  Clock,
  CheckCircle2,
  Beaker,
  Sprout,
  ChevronDown
} from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

export default function App() {
  const [activeTab, setActiveTab] = useState('solo');
  const [showSoilResults, setShowSoilResults] = useState(false);
  const [showPlantResults, setShowPlantResults] = useState(false);

  const [soilData, setSoilData] = useState<SoilAnalysisData>({
    culture: '',
    depth: '',
    ph: '',
    organicMatter: '',
    phosphorus: '',
    potassium: '',
    calcium: '',
    magnesium: '',
    aluminum: '',
    hPlusAl: '',
    ctc: '',
    basesSaturation: '',
    sulfur: '',
    boron: '',
    copper: '',
    iron: '',
    manganese: '',
    zinc: '',
    soilTexture: '',
    remainingPhosphorus: '',
  });

  const [plantData, setPlantData] = useState<PlantAnalysisData>({
    culture: '',
    growthStage: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    calcium: '',
    magnesium: '',
    sulfur: '',
  });

  const handleSoilAnalyze = () => {
    if (
      soilData.culture &&
      soilData.ph &&
      soilData.phosphorus &&
      soilData.potassium &&
      soilData.basesSaturation
    ) {
      setShowSoilResults(true);
      // Scroll suave até os resultados
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      alert('Por favor, preencha pelo menos: Cultura, pH, Fósforo, Potássio e Saturação por Bases');
    }
  };

  const handlePlantAnalyze = () => {
    if (
      plantData.culture &&
      plantData.nitrogen &&
      plantData.phosphorus &&
      plantData.potassium
    ) {
      setShowPlantResults(true);
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      alert('Por favor, preencha pelo menos: Cultura, Nitrogênio, Fósforo e Potássio');
    }
  };

  const handleResetSoil = () => {
    setSoilData({
      culture: '',
      depth: '',
      ph: '',
      organicMatter: '',
      phosphorus: '',
      potassium: '',
      calcium: '',
      magnesium: '',
      aluminum: '',
      hPlusAl: '',
      ctc: '',
      basesSaturation: '',
      sulfur: '',
      boron: '',
      copper: '',
      iron: '',
      manganese: '',
      zinc: '',
      soilTexture: '',
      remainingPhosphorus: '',
    });
    setShowSoilResults(false);
  };

  const handleResetPlant = () => {
    setPlantData({
      culture: '',
      growthStage: '',
      nitrogen: '',
      phosphorus: '',
      potassium: '',
      calcium: '',
      magnesium: '',
      sulfur: '',
    });
    setShowPlantResults(false);
  };

  const scrollToAnalysis = () => {
    document.getElementById('analysis-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-green-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-600">
                <FlaskConical className="size-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-green-900">LASP - IIAM</h2>
                <p className="text-xs text-green-600">Laboratório de Análise de Solo e Plantas</p>
              </div>
            </div>
            <div className="hidden md:flex gap-6 text-sm">
              <a href="#home" className="text-green-700 hover:text-green-900 transition-colors">Início</a>
              <a href="#about" className="text-green-700 hover:text-green-900 transition-colors">Sobre</a>
              <a href="#services" className="text-green-700 hover:text-green-900 transition-colors">Serviços</a>
              <a href="#analysis-section" className="text-green-700 hover:text-green-900 transition-colors">Análises</a>
              <a href="#contact" className="text-green-700 hover:text-green-900 transition-colors">Contato</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-[500px] overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1720202194910-75fd3bc2b820?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWJvcmF0b3J5JTIwYWdyaWN1bHR1cmUlMjBzb2lsJTIwdGVzdGluZ3xlbnwxfHx8fDE3NzA0ODIzMTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Laboratório de Análise de Solo"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-emerald-900/70 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-sm border-2 border-white/20">
                <FlaskConical className="size-16" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              Laboratório de Análise de Solos e Plantas
            </h1>
            <p className="text-2xl md:text-3xl text-green-100 mb-2">
              IIAM - Delegação Regional de Nampula
            </p>
            <p className="text-lg text-green-200 mb-8">
              Excelência em Análises Agrícolas | Baseado na 5ª Aproximação (Ribeiro et al., 1999)
            </p>
            <Button 
              onClick={scrollToAnalysis}
              size="lg" 
              className="bg-white text-green-700 hover:bg-green-50 px-8 py-6 text-lg"
            >
              Faça sua Análise
              <ChevronDown className="ml-2 size-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-green-900 mb-4">Sobre o Laboratório</h2>
            <p className="text-lg text-green-700 max-w-2xl mx-auto">
              Referência em análises de solo e plantas na região norte de Moçambique
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1724531281596-cfae90d5a082?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbnRpc3QlMjBsYWJvcmF0b3J5JTIwbWljcm9zY29wZSUyMGFncmljdWx0dXJlfGVufDF8fHx8MTc3MDU0MDMwNnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Laboratório"
                className="w-full h-96 object-cover"
              />
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="p-3 rounded-lg bg-green-100">
                    <Award className="size-8 text-green-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-900 mb-2">Acreditação e Qualidade</h3>
                  <p className="text-green-700">
                    Laboratório credenciado pelo IIAM com padrões internacionais de qualidade e precisão nas análises.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="p-3 rounded-lg bg-green-100">
                    <Users className="size-8 text-green-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-900 mb-2">Equipe Especializada</h3>
                  <p className="text-green-700">
                    Profissionais qualificados com anos de experiência em análises químicas e interpretação de resultados.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="p-3 rounded-lg bg-green-100">
                    <Microscope className="size-8 text-green-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-900 mb-2">Tecnologia de Ponta</h3>
                  <p className="text-green-700">
                    Equipamentos modernos e metodologias validadas para garantir resultados confiáveis e precisos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gradient-to-b from-green-50 to-emerald-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-green-900 mb-4">Nossos Serviços</h2>
            <p className="text-lg text-green-700">
              Soluções completas para análise e recomendação de fertilidade
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 border-green-200 hover:border-green-400 transition-all hover:shadow-xl">
              <CardHeader>
                <div className="p-4 rounded-lg bg-green-100 w-fit mb-4">
                  <Beaker className="size-10 text-green-600" />
                </div>
                <CardTitle className="text-xl">Análise Química de Solo</CardTitle>
                <CardDescription>Completa caracterização da fertilidade do solo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-sm">pH em água e CaCl₂</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-sm">Macronutrientes (N, P, K, Ca, Mg, S)</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-sm">Micronutrientes (B, Cu, Fe, Mn, Zn)</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-sm">Matéria orgânica e CTC</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-sm">Fósforo remanescente (P-rem)</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 hover:border-green-400 transition-all hover:shadow-xl">
              <CardHeader>
                <div className="p-4 rounded-lg bg-emerald-100 w-fit mb-4">
                  <Leaf className="size-10 text-emerald-600" />
                </div>
                <CardTitle className="text-xl">Análise Foliar</CardTitle>
                <CardDescription>Diagnóstico nutricional das plantas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-sm">Teores de N, P, K, Ca, Mg, S</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-sm">Micronutrientes essenciais</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-sm">Interpretação por cultura</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-sm">Recomendações de correção</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-sm">Análise por estádio fenológico</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 hover:border-green-400 transition-all hover:shadow-xl">
              <CardHeader>
                <div className="p-4 rounded-lg bg-teal-100 w-fit mb-4">
                  <Sprout className="size-10 text-teal-600" />
                </div>
                <CardTitle className="text-xl">Recomendações Técnicas</CardTitle>
                <CardDescription>Planos personalizados de adubação</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-sm">Cálculo de calagem e gessagem</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-sm">Doses de NPK por cultura</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-sm">Fontes e épocas de aplicação</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-sm">Parcelamento de adubação</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-sm">Assistência técnica especializada</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Diferencias */}
          <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-green-900 mb-6 text-center">Por que escolher nosso laboratório?</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <Clock className="size-6 text-green-600 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-green-900 mb-1">Agilidade na Entrega</h4>
                  <p className="text-sm text-green-700">Resultados rápidos sem comprometer a qualidade das análises</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Award className="size-6 text-green-600 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-green-900 mb-1">Metodologia 5ª Aproximação</h4>
                  <p className="text-sm text-green-700">Sistema validado e amplamente utilizado no Brasil</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Users className="size-6 text-green-600 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-green-900 mb-1">Atendimento Personalizado</h4>
                  <p className="text-sm text-green-700">Consultoria técnica e interpretação detalhada dos resultados</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="size-6 text-green-600 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-green-900 mb-1">Confiabilidade Garantida</h4>
                  <p className="text-sm text-green-700">Controle de qualidade rigoroso em todas as etapas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analysis Section */}
      <section id="analysis-section" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-green-900 mb-4">Sistema de Interpretação Online</h2>
            <p className="text-lg text-green-700 max-w-2xl mx-auto">
              Insira os dados da sua análise e obtenha interpretação e recomendações automatizadas
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 h-auto p-1">
              <TabsTrigger value="solo" className="gap-2 py-3">
                <Leaf className="size-4" />
                Análise de Solo
              </TabsTrigger>
              <TabsTrigger value="planta" className="gap-2 py-3">
                <FileText className="size-4" />
                Análise Foliar
              </TabsTrigger>
            </TabsList>

            {/* Análise de Solo */}
            <TabsContent value="solo" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1629808477627-3ba9b1359c4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JuJTIwZmllbGQlMjBhZ3JpY3VsdHVyZSUyMGNyb3B8ZW58MXx8fHwxNzcwNDgyMzEyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Cultivo agrícola"
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1656740840031-41cb3bc73c01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMHBsYW50JTIwZ3Jvd2luZyUyMGFncmljdWx0dXJhbHxlbnwxfHx8fDE3NzA0ODIzMTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Plantas em crescimento"
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>

              <SoilAnalysisForm data={soilData} onChange={setSoilData} />

              <div className="flex gap-3 justify-center">
                <Button
                  onClick={handleSoilAnalyze}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-8"
                >
                  <FlaskConical className="size-5 mr-2" />
                  Analisar e Gerar Recomendações
                </Button>
                {showSoilResults && (
                  <Button
                    onClick={handleResetSoil}
                    size="lg"
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-50"
                  >
                    Nova Análise
                  </Button>
                )}
              </div>

              {showSoilResults && (
                <div id="results-section" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <NutrientChart data={soilData} />
                  <SoilInterpretation5th data={soilData} />
                  <Fertilization5th data={soilData} />
                </div>
              )}
            </TabsContent>

            {/* Análise de Planta */}
            <TabsContent value="planta" className="space-y-6">
              <div className="rounded-xl overflow-hidden shadow-lg max-w-2xl mx-auto">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1630097000556-e842ad79625b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3liZWFuJTIwcGxhbnQlMjBsZWF2ZXN8ZW58MXx8fHwxNzcwNDgyMzEyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Análise foliar"
                  className="w-full h-64 object-cover"
                />
              </div>

              <PlantAnalysisForm data={plantData} onChange={setPlantData} />

              <div className="flex gap-3 justify-center">
                <Button
                  onClick={handlePlantAnalyze}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-8"
                >
                  <FlaskConical className="size-5 mr-2" />
                  Interpretar Análise Foliar
                </Button>
                {showPlantResults && (
                  <Button
                    onClick={handleResetPlant}
                    size="lg"
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-50"
                  >
                    Nova Análise
                  </Button>
                )}
              </div>

              {showPlantResults && (
                <div id="results-section" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <PlantInterpretation data={plantData} />
                  <NutrientChart data={plantData} />
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gradient-to-b from-green-50 to-emerald-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-green-900 mb-4">Entre em Contato</h2>
            <p className="text-lg text-green-700">
              Estamos prontos para atender suas necessidades de análise agrícola
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-green-200">
              <CardHeader>
                <CardTitle>Informações de Contato</CardTitle>
                <CardDescription>Fale conosco através dos canais abaixo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="size-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-green-900">Endereço</p>
                    <p className="text-sm text-green-700">
                      IIAM - Delegação Regional de Nampula<br />
                      Nampula, Moçambique
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="size-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-green-900">Telefone</p>
                    <p className="text-sm text-green-700">+258 84/878078402</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="size-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-green-900">E-mail</p>
                    <p className="text-sm text-green-700">munir.jussub@outlook.com</p>
                    <p className="text-sm text-green-700">lasp@iiam.gov.mz</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="size-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-green-900">Horário de Atendimento</p>
                    <p className="text-sm text-green-700">Segunda a Sexta: 7h30 - 15h30</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="rounded-xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://plus.unsplash.com/premium_photo-1663011253265-9b5cb2b5ac92?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Equipe do laboratório"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-green-700">
                  <FlaskConical className="size-6" />
                </div>
                <div>
                  <h3 className="font-bold">LASP - IIAM</h3>
                  <p className="text-xs text-green-200">Excelência em Análises</p>
                </div>
              </div>
              <p className="text-sm text-green-200">
                Laboratório de Análise de Solos e Plantas - Instituto de Investigação Agrária de Moçambique
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Links Rápidos</h4>
              <ul className="space-y-2 text-sm text-green-200">
                <li><a href="#home" className="hover:text-white transition-colors">Início</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">Sobre Nós</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Serviços</a></li>
                <li><a href="#analysis-section" className="hover:text-white transition-colors">Análises Online</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Metodologia</h4>
              <p className="text-sm text-green-200 mb-2">
                Baseado na 5ª Aproximação de Recomendação de Calagem e Adubação para Minas Gerais
              </p>
              <p className="text-xs text-green-300">
                Ribeiro, A.C.; Guimarães, P.T.G.; Alvarez V., V.H. (1999)
              </p>
            </div>
          </div>

          <div className="border-t border-green-700 pt-6">
            <div className="text-center text-sm text-green-200">
              <p className="mb-2">
                <strong>Aviso Legal:</strong> Este sistema fornece orientações técnicas baseadas em metodologias validadas.
                Para recomendações definitivas, consulte um Engenheiro Agrônomo.
              </p>
              <p>© 2026 LASP-IIAM | Desenvolvido por Eng. Agrônomo Munir Jussub</p>
              <p className="text-xs mt-1">munir.jussub@outlook.com</p>
            </div>
          </div>
        </div>
      </footer>
      <ScrollToTop />
    </div>
  );
}