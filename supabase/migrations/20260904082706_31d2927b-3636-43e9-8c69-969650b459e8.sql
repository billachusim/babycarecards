CREATE POLICY "Service role manages guide runs" ON public.guide_generation_runs
  FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
CREATE POLICY "Service role manages guide job state" ON public.guide_job_state
  FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');