import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { AlertCircle, CheckCircle2, TrendingDown, TrendingUp } from 'lucide-react';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import type { PlantAnalysisData } from './plant-analysis-form';

interface PlantInterpretationProps {
  data: PlantAnalysisData;
}

interface NutrientRange {
  deficient: number;
  low: number;
  adequate: number;
  high: number;
}

interface NutrientInterpretation {
  level: 'Deficiente' | 'Baixo' | 'Adequado' | 'Alto' | 'Excessivo';
  color: string;
  icon: React.ReactNode;
}

export function PlantInterpretation({ data }: PlantInterpretationProps) {
  // Faixas de suficiência para diferentes culturas (g/kg)
  const getNutrientRanges = (culture: string) => {
    const ranges: { [key: string]: { [nutrient: string]: NutrientRange } } = {
      milho: {
        N: { deficient: 20, low: 27.5, adequate: 35, high: 40 },
        P: { deficient: 2.0, low: 2.5, adequate: 3.5, high: 5.0 },
        K: { deficient: 15, low: 17.5, adequate: 25, high: 35 },
        Ca: { deficient: 3, low: 5, adequate: 8, high: 15 },
        Mg: { deficient: 2, low: 2.5, adequate: 3.5, high: 6 },
        S: { deficient: 1.5, low: 2.0, adequate: 2.5, high: 4.0 },
      },
      soja: {
        N: { deficient: 40, low: 45, adequate: 55, high: 65 },
        P: { deficient: 2.5, low: 3.0, adequate: 4.0, high: 6.0 },
        K: { deficient: 17, low: 20, adequate: 25, high: 35 },
        Ca: { deficient: 4, low: 6, adequate: 10, high: 20 },
        Mg: { deficient: 3, low: 4, adequate: 6, high: 10 },
        S: { deficient: 2.0, low: 2.5, adequate: 3.5, high: 5.0 },
      },
      cafe: {
        N: { deficient: 24, low: 26, adequate: 30, high: 35 },
        P: { deficient: 1.0, low: 1.2, adequate: 1.5, high: 2.0 },
        K: { deficient: 18, low: 20, adequate: 24, high: 30 },
        Ca: { deficient: 8, low: 10, adequate: 15, high: 20 },
        Mg: { deficient: 2.5, low: 3.0, adequate: 4.0, high: 6.0 },
        S: { deficient: 1.5, low: 2.0, adequate: 2.5, high: 3.5 },
      },
      default: {
        N: { deficient: 25, low: 30, adequate: 40, high: 50 },
        P: { deficient: 2.0, low: 2.5, adequate: 3.5, high: 5.0 },
        K: { deficient: 15, low: 20, adequate: 25, high: 35 },
        Ca: { deficient: 4, low: 6, adequate: 10, high: 15 },
        Mg: { deficient: 2.5, low: 3.0, adequate: 4.0, high: 6.0 },
        S: { deficient: 1.5, low: 2.0, adequate: 2.5, high: 4.0 },
      },
    };

    return ranges[culture] || ranges.default;
  };

  const interpretNutrient = (value: number, ranges: NutrientRange): NutrientInterpretation => {
    if (value < ranges.deficient) {
      return {
        level: 'Deficiente',
        color: 'bg-red-500',
        icon: <AlertCircle className="size-4" />,
      };
    } else if (value < ranges.low) {
      return {
        level: 'Baixo',
        color: 'bg-orange-500',
        icon: <TrendingDown className="size-4" />,
      };
    } else if (value < ranges.adequate) {
      return {
        level: 'Adequado',
        color: 'bg-green-500',
        icon: <CheckCircle2 className="size-4" />,
      };
    } else if (value < ranges.high) {
      return {
        level: 'Alto',
        color: 'bg-blue-500',
        icon: <TrendingUp className="size-4" />,
      };
    } else {
      return {
        level: 'Excessivo',
        color: 'bg-purple-500',
        icon: <AlertCircle className="size-4" />,
      };
    }
  };

  const ranges = getNutrientRanges(data.culture);

  const nValue = parseFloat(data.nitrogen) || 0;
  const pValue = parseFloat(data.phosphorus) || 0;
  const kValue = parseFloat(data.potassium) || 0;
  const caValue = parseFloat(data.calcium) || 0;
  const mgValue = parseFloat(data.magnesium) || 0;
  const sValue = parseFloat(data.sulfur) || 0;

  const nInterp = interpretNutrient(nValue, ranges.N);
  const pInterp = interpretNutrient(pValue, ranges.P);
  const kInterp = interpretNutrient(kValue, ranges.K);
  const caInterp = interpretNutrient(caValue, ranges.Ca);
  const mgInterp = interpretNutrient(mgValue, ranges.Mg);
  const sInterp = interpretNutrient(sValue, ranges.S);

  const getDiagnosticRecommendations = (): string[] => {
    const recommendations: string[] = [];

    if (nInterp.level === 'Deficiente' || nInterp.level === 'Baixo') {
      recommendations.push('Deficiência de N: Aplicar adubação nitrogenada complementar em cobertura');
    }

    if (pInterp.level === 'Deficiente' || pInterp.level === 'Baixo') {
      recommendations.push('Deficiência de P: Aumentar adubação fosfatada no próximo ciclo ou aplicar via foliar');
    }

    if (kInterp.level === 'Deficiente' || kInterp.level === 'Baixo') {
      recommendations.push('Deficiência de K: Aplicar cloreto de potássio em cobertura ou via fertirrigação');
    }

    if (caInterp.level === 'Deficiente' || caInterp.level === 'Baixo') {
      recommendations.push('Deficiência de Ca: Considerar calagem ou aplicação de gesso agrícola');
    }

    if (mgInterp.level === 'Deficiente' || mgInterp.level === 'Baixo') {
      recommendations.push('Deficiência de Mg: Utilizar calcário dolomítico ou aplicar sulfato de magnésio');
    }

    if (sInterp.level === 'Deficiente' || sInterp.level === 'Baixo') {
      recommendations.push('Deficiência de S: Aplicar sulfato de amônio ou gesso agrícola');
    }

    // Verificar relações entre nutrientes
    if (kValue > 0 && mgValue > 0 && (kValue / mgValue) > 10) {
      recommendations.push('Relação K/Mg elevada: pode induzir deficiência de magnésio');
    }

    if (caValue > 0 && mgValue > 0 && (caValue / mgValue) > 8) {
      recommendations.push('Relação Ca/Mg elevada: monitorar possível deficiência induzida de magnésio');
    }

    if (nInterp.level === 'Excessivo') {
      recommendations.push('Excesso de N: pode causar crescimento vegetativo excessivo e retardar maturação');
    }

    return recommendations;
  };

  const recommendations = getDiagnosticRecommendations();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interpretação da Análise Foliar</CardTitle>
        <CardDescription>
          Estado nutricional das plantas - {data.culture ? data.culture.charAt(0).toUpperCase() + data.culture.slice(1) : 'Cultura não selecionada'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-md ${nInterp.color} text-white`}>
                {nInterp.icon}
              </div>
              <div>
                <p className="font-medium">Nitrogênio (N)</p>
                <p className="text-sm text-muted-foreground">{nValue.toFixed(1)} g/kg</p>
              </div>
            </div>
            <Badge variant="outline" className="font-medium">
              {nInterp.level}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-md ${pInterp.color} text-white`}>
                {pInterp.icon}
              </div>
              <div>
                <p className="font-medium">Fósforo (P)</p>
                <p className="text-sm text-muted-foreground">{pValue.toFixed(1)} g/kg</p>
              </div>
            </div>
            <Badge variant="outline" className="font-medium">
              {pInterp.level}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-md ${kInterp.color} text-white`}>
                {kInterp.icon}
              </div>
              <div>
                <p className="font-medium">Potássio (K)</p>
                <p className="text-sm text-muted-foreground">{kValue.toFixed(1)} g/kg</p>
              </div>
            </div>
            <Badge variant="outline" className="font-medium">
              {kInterp.level}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-md ${caInterp.color} text-white`}>
                {caInterp.icon}
              </div>
              <div>
                <p className="font-medium">Cálcio (Ca)</p>
                <p className="text-sm text-muted-foreground">{caValue.toFixed(1)} g/kg</p>
              </div>
            </div>
            <Badge variant="outline" className="font-medium">
              {caInterp.level}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-md ${mgInterp.color} text-white`}>
                {mgInterp.icon}
              </div>
              <div>
                <p className="font-medium">Magnésio (Mg)</p>
                <p className="text-sm text-muted-foreground">{mgValue.toFixed(1)} g/kg</p>
              </div>
            </div>
            <Badge variant="outline" className="font-medium">
              {mgInterp.level}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-md ${sInterp.color} text-white`}>
                {sInterp.icon}
              </div>
              <div>
                <p className="font-medium">Enxofre (S)</p>
                <p className="text-sm text-muted-foreground">{sValue.toFixed(1)} g/kg</p>
              </div>
            </div>
            <Badge variant="outline" className="font-medium">
              {sInterp.level}
            </Badge>
          </div>
        </div>

        {recommendations.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold">Recomendações de Correção</h4>
            {recommendations.map((rec, index) => (
              <Alert key={index}>
                <AlertDescription className="text-sm">{rec}</AlertDescription>
              </Alert>
            ))}
          </div>
        )}

        <Alert className="bg-green-50 border-green-200">
          <AlertDescription className="text-sm">
            <p className="font-medium mb-1">Momento da Coleta:</p>
            A interpretação considera o estádio fenológico: <strong>{data.growthStage || 'não informado'}</strong>.
            Para diagnóstico preciso, coletar sempre no mesmo estádio e nas folhas indicadoras da cultura.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
