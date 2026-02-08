import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { AlertCircle, CheckCircle2, TrendingDown, TrendingUp, AlertTriangle } from 'lucide-react';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import type { SoilAnalysisData } from './soil-analysis-form';

interface SoilInterpretationProps {
  data: SoilAnalysisData;
}

interface NutrientInterpretation {
  level: 'Muito Baixo' | 'Baixo' | 'Médio' | 'Bom' | 'Muito Bom';
  color: string;
  icon: React.ReactNode;
}

export function SoilInterpretation5th({ data }: SoilInterpretationProps) {
  // Interpretação baseada na 5ª Aproximação (Ribeiro et al., 1999)
  
  const interpretPh = (ph: number): NutrientInterpretation => {
    if (ph < 5.0) return { level: 'Muito Baixo', color: 'bg-red-500', icon: <AlertCircle className="size-4" /> };
    if (ph < 5.5) return { level: 'Baixo', color: 'bg-orange-500', icon: <TrendingDown className="size-4" /> };
    if (ph < 6.0) return { level: 'Médio', color: 'bg-yellow-500', icon: <AlertTriangle className="size-4" /> };
    if (ph <= 6.5) return { level: 'Bom', color: 'bg-green-500', icon: <CheckCircle2 className="size-4" /> };
    return { level: 'Muito Bom', color: 'bg-blue-500', icon: <CheckCircle2 className="size-4" /> };
  };

  const interpretOrganicMatter = (om: number): NutrientInterpretation => {
    if (om < 1.5) return { level: 'Muito Baixo', color: 'bg-red-500', icon: <AlertCircle className="size-4" /> };
    if (om < 2.5) return { level: 'Baixo', color: 'bg-orange-500', icon: <TrendingDown className="size-4" /> };
    if (om < 4.0) return { level: 'Médio', color: 'bg-yellow-500', icon: <TrendingUp className="size-4" /> };
    if (om <= 7.0) return { level: 'Bom', color: 'bg-green-500', icon: <CheckCircle2 className="size-4" /> };
    return { level: 'Muito Bom', color: 'bg-blue-500', icon: <CheckCircle2 className="size-4" /> };
  };

  const interpretPhosphorus = (p: number, prem: number, texture: string): NutrientInterpretation => {
    // Interpretação depende do P-rem (fósforo remanescente) para solos de MG
    // Valores para solos argilosos/muito argilosos
    let limits = { mb: 4, b: 8, m: 12, bo: 20 };
    
    if (prem > 0) {
      if (prem < 20) {
        limits = { mb: 2, b: 4, m: 6, bo: 10 };
      } else if (prem < 40) {
        limits = { mb: 4, b: 8, m: 12, bo: 20 };
      } else {
        limits = { mb: 10, b: 20, m: 30, bo: 50 };
      }
    } else {
      // Baseado em textura se P-rem não disponível
      if (texture === 'arenosa') {
        limits = { mb: 6, b: 12, m: 18, bo: 30 };
      } else if (texture === 'media') {
        limits = { mb: 4, b: 8, m: 12, bo: 20 };
      }
    }

    if (p < limits.mb) return { level: 'Muito Baixo', color: 'bg-red-500', icon: <AlertCircle className="size-4" /> };
    if (p < limits.b) return { level: 'Baixo', color: 'bg-orange-500', icon: <TrendingDown className="size-4" /> };
    if (p < limits.m) return { level: 'Médio', color: 'bg-yellow-500', icon: <TrendingUp className="size-4" /> };
    if (p <= limits.bo) return { level: 'Bom', color: 'bg-green-500', icon: <CheckCircle2 className="size-4" /> };
    return { level: 'Muito Bom', color: 'bg-blue-500', icon: <CheckCircle2 className="size-4" /> };
  };

  const interpretPotassium = (k: number): NutrientInterpretation => {
    // K em mg/dm³
    if (k < 40) return { level: 'Muito Baixo', color: 'bg-red-500', icon: <AlertCircle className="size-4" /> };
    if (k < 70) return { level: 'Baixo', color: 'bg-orange-500', icon: <TrendingDown className="size-4" /> };
    if (k < 120) return { level: 'Médio', color: 'bg-yellow-500', icon: <TrendingUp className="size-4" /> };
    if (k <= 200) return { level: 'Bom', color: 'bg-green-500', icon: <CheckCircle2 className="size-4" /> };
    return { level: 'Muito Bom', color: 'bg-blue-500', icon: <CheckCircle2 className="size-4" /> };
  };

  const interpretCalcium = (ca: number): NutrientInterpretation => {
    if (ca < 0.4) return { level: 'Muito Baixo', color: 'bg-red-500', icon: <AlertCircle className="size-4" /> };
    if (ca < 1.2) return { level: 'Baixo', color: 'bg-orange-500', icon: <TrendingDown className="size-4" /> };
    if (ca < 2.4) return { level: 'Médio', color: 'bg-yellow-500', icon: <TrendingUp className="size-4" /> };
    if (ca <= 4.0) return { level: 'Bom', color: 'bg-green-500', icon: <CheckCircle2 className="size-4" /> };
    return { level: 'Muito Bom', color: 'bg-blue-500', icon: <CheckCircle2 className="size-4" /> };
  };

  const interpretMagnesium = (mg: number): NutrientInterpretation => {
    if (mg < 0.15) return { level: 'Muito Baixo', color: 'bg-red-500', icon: <AlertCircle className="size-4" /> };
    if (mg < 0.45) return { level: 'Baixo', color: 'bg-orange-500', icon: <TrendingDown className="size-4" /> };
    if (mg < 0.8) return { level: 'Médio', color: 'bg-yellow-500', icon: <TrendingUp className="size-4" /> };
    if (mg <= 1.5) return { level: 'Bom', color: 'bg-green-500', icon: <CheckCircle2 className="size-4" /> };
    return { level: 'Muito Bom', color: 'bg-blue-500', icon: <CheckCircle2 className="size-4" /> };
  };

  const interpretSulfur = (s: number): NutrientInterpretation => {
    if (s < 5) return { level: 'Muito Baixo', color: 'bg-red-500', icon: <AlertCircle className="size-4" /> };
    if (s < 10) return { level: 'Baixo', color: 'bg-orange-500', icon: <TrendingDown className="size-4" /> };
    if (s < 15) return { level: 'Médio', color: 'bg-yellow-500', icon: <TrendingUp className="size-4" /> };
    if (s <= 20) return { level: 'Bom', color: 'bg-green-500', icon: <CheckCircle2 className="size-4" /> };
    return { level: 'Muito Bom', color: 'bg-blue-500', icon: <CheckCircle2 className="size-4" /> };
  };

  const interpretBoron = (b: number): NutrientInterpretation => {
    if (b < 0.2) return { level: 'Muito Baixo', color: 'bg-red-500', icon: <AlertCircle className="size-4" /> };
    if (b < 0.4) return { level: 'Baixo', color: 'bg-orange-500', icon: <TrendingDown className="size-4" /> };
    if (b < 0.6) return { level: 'Médio', color: 'bg-yellow-500', icon: <TrendingUp className="size-4" /> };
    if (b <= 0.9) return { level: 'Bom', color: 'bg-green-500', icon: <CheckCircle2 className="size-4" /> };
    return { level: 'Muito Bom', color: 'bg-blue-500', icon: <CheckCircle2 className="size-4" /> };
  };

  const interpretCopper = (cu: number): NutrientInterpretation => {
    if (cu < 0.3) return { level: 'Muito Baixo', color: 'bg-red-500', icon: <AlertCircle className="size-4" /> };
    if (cu < 0.8) return { level: 'Baixo', color: 'bg-orange-500', icon: <TrendingDown className="size-4" /> };
    if (cu < 1.3) return { level: 'Médio', color: 'bg-yellow-500', icon: <TrendingUp className="size-4" /> };
    if (cu <= 2.0) return { level: 'Bom', color: 'bg-green-500', icon: <CheckCircle2 className="size-4" /> };
    return { level: 'Muito Bom', color: 'bg-blue-500', icon: <CheckCircle2 className="size-4" /> };
  };

  const interpretIron = (fe: number): NutrientInterpretation => {
    if (fe < 12) return { level: 'Muito Baixo', color: 'bg-red-500', icon: <AlertCircle className="size-4" /> };
    if (fe < 30) return { level: 'Baixo', color: 'bg-orange-500', icon: <TrendingDown className="size-4" /> };
    if (fe < 45) return { level: 'Médio', color: 'bg-yellow-500', icon: <TrendingUp className="size-4" /> };
    if (fe <= 90) return { level: 'Bom', color: 'bg-green-500', icon: <CheckCircle2 className="size-4" /> };
    return { level: 'Muito Bom', color: 'bg-blue-500', icon: <CheckCircle2 className="size-4" /> };
  };

  const interpretManganese = (mn: number): NutrientInterpretation => {
    if (mn < 3) return { level: 'Muito Baixo', color: 'bg-red-500', icon: <AlertCircle className="size-4" /> };
    if (mn < 6) return { level: 'Baixo', color: 'bg-orange-500', icon: <TrendingDown className="size-4" /> };
    if (mn < 9) return { level: 'Médio', color: 'bg-yellow-500', icon: <TrendingUp className="size-4" /> };
    if (mn <= 12) return { level: 'Bom', color: 'bg-green-500', icon: <CheckCircle2 className="size-4" /> };
    return { level: 'Muito Bom', color: 'bg-blue-500', icon: <CheckCircle2 className="size-4" /> };
  };

  const interpretZinc = (zn: number): NutrientInterpretation => {
    if (zn < 0.6) return { level: 'Muito Baixo', color: 'bg-red-500', icon: <AlertCircle className="size-4" /> };
    if (zn < 1.2) return { level: 'Baixo', color: 'bg-orange-500', icon: <TrendingDown className="size-4" /> };
    if (zn < 2.2) return { level: 'Médio', color: 'bg-yellow-500', icon: <TrendingUp className="size-4" /> };
    if (zn <= 5.0) return { level: 'Bom', color: 'bg-green-500', icon: <CheckCircle2 className="size-4" /> };
    return { level: 'Muito Bom', color: 'bg-blue-500', icon: <CheckCircle2 className="size-4" /> };
  };

  const interpretBasesSaturation = (v: number): NutrientInterpretation => {
    if (v < 20) return { level: 'Muito Baixo', color: 'bg-red-500', icon: <AlertCircle className="size-4" /> };
    if (v < 40) return { level: 'Baixo', color: 'bg-orange-500', icon: <TrendingDown className="size-4" /> };
    if (v < 50) return { level: 'Médio', color: 'bg-yellow-500', icon: <TrendingUp className="size-4" /> };
    if (v <= 60) return { level: 'Bom', color: 'bg-green-500', icon: <CheckCircle2 className="size-4" /> };
    return { level: 'Muito Bom', color: 'bg-blue-500', icon: <CheckCircle2 className="size-4" /> };
  };

  const NutrientCard = ({ 
    name, 
    value, 
    unit, 
    interpretation 
  }: { 
    name: string; 
    value: string; 
    unit: string; 
    interpretation: NutrientInterpretation;
  }) => (
    <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-md ${interpretation.color} text-white`}>
          {interpretation.icon}
        </div>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">{value} {unit}</p>
        </div>
      </div>
      <Badge variant="outline" className="font-medium">
        {interpretation.level}
      </Badge>
    </div>
  );

  const phValue = parseFloat(data.ph) || 0;
  const omValue = parseFloat(data.organicMatter) || 0;
  const pValue = parseFloat(data.phosphorus) || 0;
  const kValue = parseFloat(data.potassium) || 0;
  const caValue = parseFloat(data.calcium) || 0;
  const mgValue = parseFloat(data.magnesium) || 0;
  const sValue = parseFloat(data.sulfur) || 0;
  const vValue = parseFloat(data.basesSaturation) || 0;
  const premValue = parseFloat(data.remainingPhosphorus) || 0;

  const bValue = parseFloat(data.boron) || 0;
  const cuValue = parseFloat(data.copper) || 0;
  const feValue = parseFloat(data.iron) || 0;
  const mnValue = parseFloat(data.manganese) || 0;
  const znValue = parseFloat(data.zinc) || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interpretação dos Resultados - 5ª Aproximação</CardTitle>
        <CardDescription>
          Classificação dos níveis de nutrientes segundo Ribeiro et al. (1999)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="macros" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="macros">Macronutrientes</TabsTrigger>
            <TabsTrigger value="micros">Micronutrientes</TabsTrigger>
            <TabsTrigger value="indices">Índices</TabsTrigger>
          </TabsList>

          <TabsContent value="macros" className="space-y-3">
            <NutrientCard
              name="pH em Água"
              value={phValue.toFixed(1)}
              unit=""
              interpretation={interpretPh(phValue)}
            />
            <NutrientCard
              name="Matéria Orgânica"
              value={omValue.toFixed(1)}
              unit="dag/kg"
              interpretation={interpretOrganicMatter(omValue)}
            />
            <NutrientCard
              name="Fósforo (P)"
              value={pValue.toFixed(1)}
              unit="mg/dm³"
              interpretation={interpretPhosphorus(pValue, premValue, data.soilTexture)}
            />
            <NutrientCard
              name="Potássio (K)"
              value={kValue.toFixed(1)}
              unit="mg/dm³"
              interpretation={interpretPotassium(kValue)}
            />
            <NutrientCard
              name="Cálcio (Ca)"
              value={caValue.toFixed(2)}
              unit="cmolc/dm³"
              interpretation={interpretCalcium(caValue)}
            />
            <NutrientCard
              name="Magnésio (Mg)"
              value={mgValue.toFixed(2)}
              unit="cmolc/dm³"
              interpretation={interpretMagnesium(mgValue)}
            />
            <NutrientCard
              name="Enxofre (S)"
              value={sValue.toFixed(1)}
              unit="mg/dm³"
              interpretation={interpretSulfur(sValue)}
            />
          </TabsContent>

          <TabsContent value="micros" className="space-y-3">
            <NutrientCard
              name="Boro (B)"
              value={bValue.toFixed(2)}
              unit="mg/dm³"
              interpretation={interpretBoron(bValue)}
            />
            <NutrientCard
              name="Cobre (Cu)"
              value={cuValue.toFixed(1)}
              unit="mg/dm³"
              interpretation={interpretCopper(cuValue)}
            />
            <NutrientCard
              name="Ferro (Fe)"
              value={feValue.toFixed(1)}
              unit="mg/dm³"
              interpretation={interpretIron(feValue)}
            />
            <NutrientCard
              name="Manganês (Mn)"
              value={mnValue.toFixed(1)}
              unit="mg/dm³"
              interpretation={interpretManganese(mnValue)}
            />
            <NutrientCard
              name="Zinco (Zn)"
              value={znValue.toFixed(1)}
              unit="mg/dm³"
              interpretation={interpretZinc(znValue)}
            />
          </TabsContent>

          <TabsContent value="indices" className="space-y-3">
            <NutrientCard
              name="Saturação por Bases (V%)"
              value={vValue.toFixed(1)}
              unit="%"
              interpretation={interpretBasesSaturation(vValue)}
            />
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <h4 className="font-semibold mb-2">Relações entre Nutrientes</h4>
              <div className="space-y-1 text-sm">
                <p>Ca/Mg: {caValue > 0 && mgValue > 0 ? (caValue / mgValue).toFixed(2) : 'N/A'} (ideal: 3-5)</p>
                <p>Ca/K: {caValue > 0 && kValue > 0 ? (caValue / (kValue / 39.1)).toFixed(2) : 'N/A'} (ideal: 10-20)</p>
                <p>Mg/K: {mgValue > 0 && kValue > 0 ? (mgValue / (kValue / 39.1)).toFixed(2) : 'N/A'} (ideal: 2-5)</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
