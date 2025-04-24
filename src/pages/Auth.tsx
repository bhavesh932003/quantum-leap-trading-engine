
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/');
      }
    });
  }, [navigate]);

  const handleAuth = async (isSignUp: boolean) => {
    try {
      setLoading(true);
      const { error } = isSignUp 
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });

      if (error) throw error;

      toast({
        title: isSignUp ? "Account created" : "Welcome back",
        description: isSignUp 
          ? "Please check your email to confirm your account" 
          : "You have been successfully logged in",
      });

      if (!isSignUp) {
        navigate('/');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-hft-background">
      <Card className="w-[400px] bg-hft-background-panel border-gray-800">
        <CardHeader>
          <CardTitle className="text-center">
            Quantum Leap <span className="text-hft-highlight">HFT</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Button
                onClick={() => handleAuth(false)}
                disabled={loading}
                className="bg-hft-buy hover:bg-hft-buy/80"
              >
                {loading ? "Processing..." : "Sign In"}
              </Button>
              <Button
                onClick={() => handleAuth(true)}
                disabled={loading}
                variant="outline"
                className="border-gray-700 hover:bg-gray-800"
              >
                Create Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
