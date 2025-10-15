import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Waves } from 'lucide-react';

export default function LoginPage() {
  const bgImage = PlaceHolderImages.find(img => img.id === 'login-bg');

  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-[350px] gap-8">
          <div className="grid gap-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <Waves className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold font-headline">FluvPred</h1>
            </div>
            <p className="text-balance text-muted-foreground">
              Insira suas credenciais para acessar seu gêmeo digital urbano
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Use seu e-mail e senha cadastrados para entrar.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@exemplo.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button asChild type="submit" className="w-full">
                <Link href="/dashboard">Entrar</Link>
              </Button>
            </CardContent>
          </Card>
          <div className="mt-4 text-center text-sm">
            Não tem uma conta?{' '}
            <Link href="#" className="underline">
              Cadastre-se
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        {bgImage && (
          <Image
            src={bgImage.imageUrl}
            alt={bgImage.description}
            data-ai-hint={bgImage.imageHint}
            fill
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20 dark:from-background dark:to-background/20" />
      </div>
    </div>
  );
}
