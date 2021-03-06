package com.Sparta.HangHaeBlog.Controller;

import com.Sparta.HangHaeBlog.Models.Memo;
import com.Sparta.HangHaeBlog.Models.MemoRepository;
import com.Sparta.HangHaeBlog.Models.MemoRequestDTO;
import com.Sparta.HangHaeBlog.Service.MemoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class MemoController
{
    private final MemoRepository memoRepository;
    private final MemoService memoService;

    @GetMapping("/api/memos")
    public List<Memo> getMemos()
    {
        return memoRepository.findAllByOrderByCreatedAtDesc();
    }

    @PostMapping("/api/memos")
    public Memo createMemo(@RequestBody MemoRequestDTO requestDto)
    {
        Memo memo = new Memo(requestDto);
        return memoRepository.save(memo);
    }

    @PutMapping("/api/memos/{id}")
    public Long updateMemo(@PathVariable Long id, @RequestBody MemoRequestDTO requestDTO)
    {
        memoService.update(id,requestDTO);
        return id;
    }

    @DeleteMapping("/api/memos/{id}")
    public Long deleteMemo(@PathVariable Long id)
    {
        memoRepository.deleteById(id);
        return id;
    }
}
